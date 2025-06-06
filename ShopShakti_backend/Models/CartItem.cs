using System.ComponentModel.DataAnnotations;

public class CartItem
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    [Url]
    public string? ImageUrl { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}
