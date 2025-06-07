namespace ShopShakti_backend.Models
{
    public class TrendingProducts
    {
        public int Id { get; set; }
        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
