using Microsoft.AspNetCore.Mvc;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace ShopShaktiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TrendingProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrendingProducts()
        {
            var trending = await _context.TrendingProducts
                .Include(tp => tp.Product)
                .Select(tp => new {
                    tp.Product.Id,
                    tp.Product.Name,
                    tp.Product.Price,
                    tp.Product.ImageUrl
                })
                .ToListAsync();

            return Ok(trending);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTrending([FromBody] List<int> productIds)
        {
            var existing = _context.TrendingProducts.ToList();
            _context.TrendingProducts.RemoveRange(existing);

            foreach (var id in productIds)
            {
                _context.TrendingProducts.Add(new TrendingProducts { ProductId = id });
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
