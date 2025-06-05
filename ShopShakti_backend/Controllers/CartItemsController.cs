using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using ShopShakti_backend.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

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

        private string? GetUserIdFromHeader()
        {
            if (Request.Headers.TryGetValue("X-User-Id", out var userId))
                return userId.ToString();
            return null;
        }

        // GET: api/cartitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var userId = GetUserIdFromHeader();
            if (userId == null)
                return Unauthorized("User ID is missing");

            return await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        // GET: api/cartitems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var userId = GetUserIdFromHeader();
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
            var userId = GetUserIdFromHeader();
            if (userId == null)
                return Unauthorized("Missing user ID");

            var cartItem = new CartItem
            {
                Name = dto.Name,
                Price = dto.Price,
                Quantity = dto.Quantity,
                ImageUrl = dto.ImageUrl,
                UserId = userId
            };

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItem), new { id = cartItem.Id }, cartItem);
        }

        // POST: api/cartitems
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(int id, CartItem cartItem)
        {
            var userId = GetUserIdFromHeader();
            if (userId == null)
                return Unauthorized();

            if (id != cartItem.Id)
                return BadRequest();

            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.Id == id && ci.UserId == userId);

            if (existingItem == null)
                return NotFound();

            existingItem.Quantity = cartItem.Quantity;
            existingItem.Name = cartItem.Name;
            existingItem.Price = cartItem.Price;
            existingItem.ImageUrl = cartItem.ImageUrl;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cartitems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var userId = GetUserIdFromHeader();
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
    }
}
