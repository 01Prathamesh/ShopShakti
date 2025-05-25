namespace ShopShakti_backend.Models
{
    public class User
    {
        public int Id { get; set; }  // Add Id as primary key
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime JoinedDate { get; set; }
        public string ProfileImage { get; set; }
    }
}
