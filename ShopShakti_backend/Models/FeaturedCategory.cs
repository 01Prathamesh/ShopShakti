using System.ComponentModel.DataAnnotations;

namespace ShopShakti_backend.Models
{
    public class FeaturedCategory
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Url]
        public string ImageUrl { get; set; }
    }

}
