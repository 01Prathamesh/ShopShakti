﻿using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [StringLength(500)]
    public string Description { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    [Required]
    [StringLength(50)]
    public string Category { get; set; }

    [Url]
    public string ImageUrl { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }
}
