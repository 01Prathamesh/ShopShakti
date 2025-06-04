using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/metrics
        [HttpGet("metrics")]
        public async Task<ActionResult<AdminMetricsDto>> GetMetrics()
        {
            var usersCount = await _context.Users.CountAsync();
            var ordersCount = await _context.Orders.CountAsync();
            var revenue = await _context.Orders.SumAsync(o => o.TotalAmount);
            var activeProducts = await _context.Products.CountAsync();
            var productsValue = await _context.Products.SumAsync(p => p.Price);

            var metrics = new AdminMetricsDto
            {
                Users = usersCount,
                Orders = ordersCount,
                Revenue = revenue,
                RevenueFormatted = FormatIndianNumber(revenue),
                ActiveProducts = activeProducts,
                ProductsValue = productsValue,
                ProductsValueFormatted = FormatIndianNumber(productsValue)
            };

            return Ok(metrics);
        }

        private string FormatIndianNumber(decimal value)
        {
            if (value >= 10000000)
                return $"{value / 10000000:#.#####} Crore";
            else if (value >= 100000) 
                return $"{value / 100000:#.#####} Lakh";
            else if (value >= 1000)
                return $"{value / 1000:#.#####} Thousand";
            else
                return value.ToString("0");
        }

    }
}
