using System.ComponentModel.DataAnnotations;

namespace ShopShakti.Models.Dto
{
    public class CartItemUpdateQuantityDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }
    }
}
