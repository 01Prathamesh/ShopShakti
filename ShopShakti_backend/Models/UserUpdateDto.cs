namespace ShopShakti_backend.Models
{
    public class UserUpdateDto
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? ProfileImage { get; set; }
        public bool? IsBlocked { get; set; }
        public string? Role { get; set; }
    }

}
