namespace ShopShakti_backend.Models.DTOs
{
    public class CartItemCreateDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }
    }
}
