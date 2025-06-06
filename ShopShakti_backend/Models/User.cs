using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Phone]
    public string Phone { get; set; }

    [StringLength(200)]
    public string Address { get; set; }

    public DateTime JoinedDate { get; set; } = DateTime.UtcNow;

    public string ProfileImage { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }  // Still hash before storing

    public bool IsBlocked { get; set; } = false;
}
