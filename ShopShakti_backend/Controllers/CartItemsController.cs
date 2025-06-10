using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti.Models.Dto;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using ShopShakti_backend.Models.DTOs;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartItemsController(AppDbContext context)
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

        // GET: api/cartitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized("User ID is missing or invalid");

            return await _context.CartItems
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .ToListAsync();
        }

        // GET: api/cartitems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized();

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);

            if (cartItem == null)
                return NotFound();

            return cartItem;
        }

        // POST: api/cartitems
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem([FromBody] CartItemCreateDto dto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized("User ID is missing");

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound("Product not found.");

            var cartItem = new CartItem
            {
                ProductId = product.Id,
                Quantity = dto.Quantity,
                UserId = userId.Value
            };

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            // Return with product included
            await _context.Entry(cartItem).Reference(c => c.Product).LoadAsync();
            return CreatedAtAction(nameof(GetCartItem), new { id = cartItem.Id }, cartItem);
        }

        // PUT: api/cartitems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItemQuantity(int id, [FromBody] CartItemUpdateQuantityDto dto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized();

            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);

            if (existingItem == null)
                return NotFound();

            existingItem.Quantity = dto.Quantity;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cartitems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized();

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);

            if (cartItem == null)
                return NotFound();

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Checkout Logic
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized();

            var cartItems = await _context.CartItems
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.Product)
                .ToListAsync();

            if (!cartItems.Any())
                return BadRequest("Cart is empty.");

            foreach (var item in cartItems)
            {
                var product = item.Product;

                if (product == null)
                    return BadRequest($"Product with ID {item.ProductId} not found.");

                if (product.Quantity < item.Quantity)
                    return BadRequest($"Not enough stock for '{product.Name}'. Available: {product.Quantity}, Requested: {item.Quantity}");

                product.Quantity -= item.Quantity;
            }

            await _context.SaveChangesAsync();

            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok("Checkout completed.");
        }
    }
}
