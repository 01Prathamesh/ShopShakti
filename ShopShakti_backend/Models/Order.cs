namespace ShopShakti_backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }              // Who placed the order
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }           // e.g., Pending, Completed, Cancelled

        // Navigation property (optional)
        public User User { get; set; }
    }
}
