using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopShakti_backend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        // ✅ Make optional so EF can fill it after the order is created
        public int? OrderId { get; set; }

        // ✅ Optional navigation
        public Order? Order { get; set; }
    }
}
