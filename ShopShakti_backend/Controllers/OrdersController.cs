using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.AspNetCore.Authorization;

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
            order.Status = "Pending";

            // Validate stock for each item BEFORE saving order
            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Product with ID {item.ProductId} not found.");

                if (item.Quantity > product.Quantity)
                    return BadRequest($"Insufficient stock for product '{product.Name}'. Available: {product.Quantity}, requested: {item.Quantity}.");
            }

            // Calculate total
            order.TotalAmount = order.Items.Sum(i => i.Price * i.Quantity) + order.ShippingFee + order.Tax;

            _context.Orders.Add(order);

            // Update product quantities after validation
            foreach (var item in order.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product != null)
                {
                    product.Quantity -= item.Quantity;
                }
            }

            await _context.SaveChangesAsync();

            // Clear cart items only if this was a cart checkout
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

    }
}
