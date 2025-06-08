using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ShopShakti_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReviewsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetAllReviews() =>
            await _context.Reviews
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();


        [HttpGet("product/{productId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetByProduct(int productId) =>
            await _context.Reviews
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

        [HttpGet("platform")]
        public async Task<ActionResult<IEnumerable<Review>>> GetPlatformReviews() =>
            await _context.Reviews
                .Where(r => r.ProductId == null)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Review updatedReview)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();

            review.Message = updatedReview.Message;
            review.Rating = updatedReview.Rating;
            review.IsApprovedForHomepage = updatedReview.IsApprovedForHomepage;
            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

}
