using ShopShakti_backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [StringLength(50)]
    public string Status { get; set; } = "Pending";

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    [Range(0, double.MaxValue)]
    public decimal TotalAmount { get; set; }

    [Range(0, double.MaxValue)]
    public decimal ShippingFee { get; set; } = 0;

    [Range(0, double.MaxValue)]
    public decimal Tax { get; set; } = 0;

    [Required]
    [StringLength(20)]
    public string PaymentMethod { get; set; } = "COD";

    [NotMapped]
    public decimal Subtotal => TotalAmount - ShippingFee - Tax;

    public List<OrderItem> Items { get; set; } = new();

    public User? User { get; set; }

    public string Address { get; set; }

    public string ShippingStatus { get; set; } = "Initialized";

}
