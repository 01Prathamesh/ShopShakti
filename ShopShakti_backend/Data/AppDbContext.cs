﻿using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Models;

namespace ShopShakti_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
