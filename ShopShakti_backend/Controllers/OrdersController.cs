using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using ShopShakti_backend.Models.Enums;
using System.Text.Json;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }
        private int? GetUserIdFromClaims()
        {
            var claim = User.FindFirst("id")?.Value;
            if (int.TryParse(claim, out var userId))
                return userId;
            return null;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.User)  // eager load user details (optional)
                .Include(o => o.Items)
                .ToListAsync();
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound();

            return order;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            order.OrderDate = DateTime.UtcNow;
            order.Status = OrderStatus.Pending;

            // Set PaymentStatus EARLY
            order.PaymentStatus = order.PaymentMethod == PaymentMethod.COD
                ? PaymentStatus.COD_Pending
                : PaymentStatus.Pending;

            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Product with ID {item.ProductId} not found.");

                if (item.Quantity > product.Quantity)
                    return BadRequest($"Insufficient stock for product '{product.Name}'. Available: {product.Quantity}, requested: {item.Quantity}.");

                if (!Enum.IsDefined(typeof(PaymentMethod), order.PaymentMethod))
                    return BadRequest("Invalid payment method.");

                if (!Enum.IsDefined(typeof(OrderStatus), order.Status))
                    return BadRequest("Invalid order status.");

                if (!Enum.IsDefined(typeof(ShippingStatus), order.ShippingStatus))
                    return BadRequest("Invalid shipping status.");
            }

            order.TotalAmount = order.Items.Sum(i => i.Price * i.Quantity) + order.ShippingFee + order.Tax;

            _context.Orders.Add(order);

            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.Quantity -= item.Quantity;
                }
            }

            await _context.SaveChangesAsync();

            // Optional cart clearing
            if (Request.Headers.TryGetValue("X-Clear-Cart", out var clearCartFlag) && clearCartFlag == "true")
            {
                var userId = order.UserId;
                var cartItems = _context.CartItems.Where(c => c.UserId == userId);
                _context.CartItems.RemoveRange(cartItems);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // PUT: api/orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id) return BadRequest();

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Orders.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/orders/user/{id}
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersForUser()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized();

            return await _context.Orders
                .Include(o => o.Items)
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }

        // PATCH: api/orders/{id}/shipping-status
        [HttpPatch("{id}/shipping-status")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> UpdateShippingStatus(int id, [FromBody] JsonElement data)
        {
            Console.WriteLine("PATCH /shipping-status called");

            if (!data.TryGetProperty("shippingStatus", out var shippingStatusProp))
            {
                Console.WriteLine("? Missing shippingStatus in payload");
                return BadRequest("Missing 'shippingStatus' field.");
            }

            var shippingStatusStr = shippingStatusProp.GetString();
            Console.WriteLine($"?? Received shippingStatus: {shippingStatusStr}");

            if (!Enum.TryParse<ShippingStatus>(shippingStatusStr, out var parsedStatus))
            {
                Console.WriteLine("? Invalid shippingStatus");
                return BadRequest("Invalid shipping status.");
            }

            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            order.ShippingStatus = parsedStatus;
            UpdateOrderStatusBasedOnState(order);

            order.UpdatedAt = DateTime.UtcNow;
            order.UpdatedBy = User.Identity?.Name ?? "System";

            await _context.SaveChangesAsync();
            return NoContent();
        }


        // PATCH: /api/orders/{id}/status
        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] JsonElement data)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            if (!data.TryGetProperty("status", out var statusProp)) return BadRequest("Missing status");
            var statusStr = statusProp.GetString();
            if (!Enum.TryParse<OrderStatus>(statusStr, out var status)) return BadRequest("Invalid status");

            order.Status = status;
            order.UpdatedAt = DateTime.UtcNow;
            order.UpdatedBy = User.Identity?.Name ?? "System";

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id}/payment-status")]
        [Authorize]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] JsonElement data)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            if (!data.TryGetProperty("paymentStatus", out var statusProp))
                return BadRequest("Missing paymentStatus");

            var statusStr = statusProp.GetString();
            if (!Enum.TryParse<PaymentStatus>(statusStr, out var paymentStatus))
                return BadRequest("Invalid payment status");

            order.PaymentStatus = paymentStatus;
            UpdateOrderStatusBasedOnState(order);
            order.UpdatedAt = DateTime.UtcNow;
            order.UpdatedBy = User.Identity?.Name ?? "System";

            await _context.SaveChangesAsync();
            return NoContent();
        }


        private void UpdateOrderStatusBasedOnState(Order order)
        {
            if (order.Status == OrderStatus.Cancelled || order.Status == OrderStatus.Refunded)
                return; // don't override manual actions

            if (order.PaymentStatus == PaymentStatus.Success)
                order.Status = OrderStatus.Confirmed;

            if (order.PaymentStatus == PaymentStatus.COD_Pending && order.ShippingStatus == ShippingStatus.OutForDelivery)
                order.Status = OrderStatus.Confirmed;

            if (order.ShippingStatus == ShippingStatus.Delivered &&
                (order.PaymentStatus == PaymentStatus.Success || order.PaymentStatus == PaymentStatus.COD_Pending))
                order.Status = OrderStatus.Completed;
        }

        [HttpGet("{id}/invoice")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Order not found");

            var stream = new MemoryStream();

            Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(30);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12).FontFamily("NotoSans")); // Keep NotoSans if you want a clean font

                    // Watermark
                    page.Background().Element(e =>
                        e.AlignCenter().AlignMiddle().Image("Resources/images/shop_logo.png", ImageScaling.FitArea)
                    );

                    page.Header().Element(ComposeHeader);
                    page.Content().Element(c => ComposeContent(c, order));
                    page.Footer().AlignCenter().Text("Thank you for shopping with us at ShopShakti!")
                        .FontSize(10).Italic().FontColor(Colors.Grey.Darken1);
                });
            }).GeneratePdf(stream);

            stream.Position = 0;
            var username = string.IsNullOrWhiteSpace(order.User?.Name) ? "User" : order.User.Name.Replace(" ", "_");
            return File(stream, "application/pdf", $"{username}_invoice_order_{order.Id}.pdf");

            // Local functions
            void ComposeHeader(IContainer container)
            {
                container.Row(row =>
                {
                    row.RelativeItem().Column(col =>
                    {
                        col.Item().Text("ShopShakti").FontSize(26).Bold().FontColor(Colors.Blue.Medium);
                        col.Item().Text("123 Business St, Jalgaon, INDIA");
                        col.Item().Text("Email: support@shopshakti.com");
                        col.Item().Text("Phone: +91 1234567890");
                    });

                    row.ConstantItem(100).Height(60)
                        .Image("Resources/images/shop_logo_name.png", ImageScaling.FitWidth);
                });
            }

            void ComposeContent(IContainer container, Order order)
            {
                container.PaddingVertical(15).Column(column =>
                {
                    var subtotal = order.Items.Sum(i => i.Price * i.Quantity);

                    // Order Info
                    column.Item().Row(row =>
                    {
                        row.RelativeItem().Text($"Invoice #: INV-{order.Id:D6}").Bold();
                        row.ConstantItem(200).Text($"Date: {order.OrderDate:yyyy-MM-dd}");
                    });

                    column.Item().Row(row =>
                    {
                        row.RelativeItem().Text($"Customer: {order.User?.Name} ({order.User?.Email})");
                        row.ConstantItem(200).Text($"Payment Method: {order.PaymentMethod}");
                    });

                    column.Item().Element(e => e.PaddingBottom(10)).Text($"Delivery Address: {order.User?.Address}");
                    column.Item().LineHorizontal(1);

                    // Items Table
                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(cols =>
                        {
                            cols.RelativeColumn(3);
                            cols.ConstantColumn(50);
                            cols.ConstantColumn(80);
                            cols.ConstantColumn(90);
                        });

                        table.Header(header =>
                        {
                            header.Cell().Element(CellStyle).Text("Item").Bold();
                            header.Cell().Element(CellStyle).AlignCenter().Text("Qty").Bold();
                            header.Cell().Element(CellStyle).AlignRight().Text("Price").Bold();
                            header.Cell().Element(CellStyle).AlignRight().Text("Total").Bold();
                        });

                        bool even = false;
                        foreach (var item in order.Items)
                        {
                            var background = even ? Colors.Grey.Lighten5 : Colors.White;
                            even = !even;

                            table.Cell().Element(CellStyle).Background(background).Text(item.Name);
                            table.Cell().Element(CellStyle).Background(background).AlignCenter().Text(item.Quantity.ToString());
                            table.Cell().Element(CellStyle).Background(background).AlignRight().Text($"Rs. {item.Price:F2}");
                            table.Cell().Element(CellStyle).Background(background).AlignRight().Text($"Rs. {item.Price * item.Quantity:F2}");
                        }

                        static IContainer CellStyle(IContainer container) =>
                            container.PaddingVertical(5).PaddingHorizontal(3).BorderBottom(1).BorderColor(Colors.Grey.Lighten2);
                    });

                    column.Item().PaddingVertical(8).LineHorizontal(1);

                    // Totals
                    column.Item().AlignRight().Column(totals =>
                    {
                        totals.Item().Text($"Subtotal: Rs. {subtotal:F2}");
                        totals.Item().Text($"Tax: Rs. {order.Tax:F2}");
                        totals.Item().Text($"Shipping: Rs. {order.ShippingFee:F2}");
                        totals.Item().PaddingVertical(3).LineHorizontal(1);
                        totals.Item().Text($"Total: Rs. {order.TotalAmount:F2}").Bold().FontSize(14);
                    });

                    // Note
                    column.Item().PaddingTop(20)
                        .Text("Note: This is a system-generated invoice and does not require a signature.")
                        .FontSize(9).FontColor(Colors.Grey.Darken2);
                });
            }
        }
    }
}
