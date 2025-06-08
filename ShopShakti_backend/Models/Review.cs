namespace ShopShakti_backend.Models
{
    public class Review
    {
        public int Id { get; set; }

        public int? ProductId { get; set; } // Null if platform-level review

        public int UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public int Rating { get; set; } // 1–5

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsApprovedForHomepage { get; set; } = false;

    }

}
