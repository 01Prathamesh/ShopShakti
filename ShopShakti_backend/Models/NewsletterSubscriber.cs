﻿namespace ShopShakti_backend.Models
{
    public class NewsletterSubscriber
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
    }

}
