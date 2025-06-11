using ShopShakti_backend.Models;
using ShopShakti_backend.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    [Range(0, double.MaxValue)]
    public decimal TotalAmount { get; set; }

    [Range(0, double.MaxValue)]
    public decimal ShippingFee { get; set; } = 0;

    [Range(0, double.MaxValue)]
    public decimal Tax { get; set; } = 0;

    [Required]
    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.COD;

    [NotMapped]
    public decimal Subtotal => TotalAmount - ShippingFee - Tax;

    public List<OrderItem> Items { get; set; } = new();

    public User? User { get; set; }

    public string Address { get; set; }

    [Required]
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;


    public ShippingStatus ShippingStatus { get; set; } = ShippingStatus.Initialized;

    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public string? UpdatedBy { get; set; }

}
