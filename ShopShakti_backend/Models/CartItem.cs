using System.ComponentModel.DataAnnotations;

public class CartItem
{
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }

    public Product Product { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }

    public string ImageUrl { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}
