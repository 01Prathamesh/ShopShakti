using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ShopShakti_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NewsletterController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscriber subscriber)
        {
            if (string.IsNullOrEmpty(subscriber.Email)) return BadRequest("Email is required.");
            _context.NewsletterSubscribers.Add(subscriber);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsletterSubscriber>>> GetAll()
            => await _context.NewsletterSubscribers.OrderByDescending(s => s.SubscribedAt).ToListAsync();

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sub = await _context.NewsletterSubscribers.FindAsync(id);
            if (sub == null) return NotFound();
            _context.NewsletterSubscribers.Remove(sub);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}
