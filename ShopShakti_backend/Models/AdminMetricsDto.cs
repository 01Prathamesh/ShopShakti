namespace ShopShakti_backend.Models
{
    public class AdminMetricsDto
    {
        public int Users { get; set; }
        public int Orders { get; set; }
        public decimal Revenue { get; set; }
        public int ActiveProducts { get; set; }
        public decimal ProductsValue { get; set; }
        public string ProductsValueFormatted { get; set; }
    }
}
