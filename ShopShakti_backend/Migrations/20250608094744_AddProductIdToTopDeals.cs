using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopShakti_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProductIdToTopDeals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "TopDeals",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "TopDeals");
        }
    }
}
