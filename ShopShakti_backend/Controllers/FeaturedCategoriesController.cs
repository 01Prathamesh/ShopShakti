using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeaturedCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/FeaturedCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeaturedCategory>>> GetFeaturedCategories()
        {
            return await _context.FeaturedCategories.ToListAsync();
        }

        // POST: api/FeaturedCategories
        [HttpPost]
        public async Task<ActionResult> SetFeaturedCategories([FromBody] List<FeaturedCategory> categories)
        {
            // Replace all existing
            var existing = _context.FeaturedCategories.ToList();
            _context.FeaturedCategories.RemoveRange(existing);

            await _context.FeaturedCategories.AddRangeAsync(categories);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

}
