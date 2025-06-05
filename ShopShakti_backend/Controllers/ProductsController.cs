using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            if (products == null || !products.Any())
            {
                // If no products are found, return a 404 (Not Found) response
                return NotFound("No products found.");
            }
            return Ok(products);  // Return 200 OK response with products
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                // If product is not found, return 404 (Not Found)
                return NotFound($"Product with ID {id} not found.");
            }
            return Ok(product);  // Return 200 OK response with product
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Validate product model (simple example)
            if (product == null || string.IsNullOrEmpty(product.Name) || product.Price <= 0 || product.Quantity < 0)
            {
                return BadRequest("Invalid product data.");
            }

            // Add the new product to the database
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Return 201 Created with location header pointing to the newly created product
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            // Ensure that the product ID matches the one in the URL
            if (id != product.Id)
            {
                return BadRequest("Product ID mismatch.");
            }

            // Check if the product exists before updating
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            // Update product properties
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Category = product.Category;
            existingProduct.ImageUrl = product.ImageUrl;
            existingProduct.Quantity = product.Quantity;

            // Mark entity as modified and save changes
            _context.Entry(existingProduct).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Log the error or rethrow depending on your logging strategy
                if (!_context.Products.Any(e => e.Id == id))
                    return NotFound($"Product with ID {id} not found.");
                else
                    throw new Exception("A concurrency error occurred while updating the product.", ex);
            }

            return NoContent();  // Return 204 No Content to indicate successful update
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Find the product to be deleted
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                // If product not found, return 404 Not Found
                return NotFound($"Product with ID {id} not found.");
            }

            // Remove product from the database
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            // Return 204 No Content after successful deletion
            return NoContent();
        }
    }
}
