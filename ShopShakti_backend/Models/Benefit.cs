namespace ShopShakti_backend.Models
{
    //Benefits of ShopShakti Platform
    public class Benefit
    {
        public int Id { get; set; }
        public string IconClass { get; set; } = "fa fa-star";
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; } = true;
    }

}
