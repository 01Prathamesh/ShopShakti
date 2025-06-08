using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Models;

namespace ShopShakti_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet for Products
        public DbSet<Product> Products { get; set; }

        // DbSet for CartItems
        public DbSet<CartItem> CartItems { get; set; }

        // DbSet for Users
        public DbSet<User> Users { get; set; }

        //DbSet for OrderItem
        public DbSet<OrderItem> OrderItems { get; set; }

        // DbSet for Orders
        public DbSet<Order> Orders { get; set; }

        //Db for TrendingProducts
        public DbSet<TrendingProducts> TrendingProducts { get; set; }

        //Db for Featured Category
        public DbSet<FeaturedCategory> FeaturedCategories { get; set; }

        //Db for Top Deals
        public DbSet<TopDeal> TopDeals { get; set; }

        //Db for Reviews
        public DbSet<Review> Reviews { get; set; }

    }
}
