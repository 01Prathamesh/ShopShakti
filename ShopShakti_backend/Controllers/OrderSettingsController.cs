using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ShopShakti_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OrderSettingsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<OrderSettings>> GetSettings()
        {
            var settings = await _context.OrderSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new OrderSettings { ShippingFee = 40, Tax = 20 };
                _context.OrderSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return Ok(settings);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSettings([FromBody] OrderSettings settings)
        {
            var existing = await _context.OrderSettings.FirstOrDefaultAsync();
            if (existing == null) return NotFound();

            existing.ShippingFee = settings.ShippingFee;
            existing.Tax = settings.Tax;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
