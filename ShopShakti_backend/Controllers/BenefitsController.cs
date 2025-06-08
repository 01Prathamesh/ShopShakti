using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ShopShakti_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BenefitsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BenefitsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Benefit>>> GetActive() =>
            await _context.Benefits.Where(b => b.IsActive).ToListAsync();

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Benefit>>> GetAll() =>
            await _context.Benefits.ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Create(Benefit benefit)
        {
            _context.Benefits.Add(benefit);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Benefit updated)
        {
            var benefit = await _context.Benefits.FindAsync(id);
            if (benefit == null) return NotFound();

            benefit.Title = updated.Title;
            benefit.Description = updated.Description;
            benefit.IconClass = updated.IconClass;
            benefit.IsActive = updated.IsActive;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var benefit = await _context.Benefits.FindAsync(id);
            if (benefit == null) return NotFound();

            _context.Benefits.Remove(benefit);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}
