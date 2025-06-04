using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopShakti_backend.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public string Status { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal ShippingFee { get; set; } = 0;

        public decimal Tax { get; set; } = 0;

        public string PaymentMethod { get; set; } = "COD"; //Cash on Delivery, or any default

        [NotMapped]
        public decimal Subtotal => TotalAmount - ShippingFee - Tax;

        public List<OrderItem> Items { get; set; } = new();

        public User? User { get; set; }
    }

}
