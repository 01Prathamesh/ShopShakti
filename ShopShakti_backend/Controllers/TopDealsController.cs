using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ShopShakti_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopDealsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TopDealsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopDeal>>> Get() =>
            await _context.TopDeals.ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(List<TopDeal> deals)
        {
            _context.TopDeals.RemoveRange(_context.TopDeals); // replace
            _context.TopDeals.AddRange(deals);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}
