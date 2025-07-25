﻿namespace ShopShakti_backend.Models
{
    public class LoginResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } = "User";
        public bool IsBlocked { get; set; }
        public string ProfileImage { get; set; }

    }
}
