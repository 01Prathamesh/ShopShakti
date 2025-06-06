using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopShakti_backend.Data;
using ShopShakti_backend.Models;
using ShopShakti_backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace ShopShakti_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public UsersController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        //GET: api/users/profile
        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile()
        {
            var claim = User.FindFirst("id")?.Value;
            if (!int.TryParse(claim, out var userId))
                return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // POST: api/users
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(new { message = "Invalid user data" });
            }

            // Hash the password before storing
            var hasher = new PasswordHasher<User>();
            user.Password = hasher.HashPassword(user, user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfile), null, user);
        }

        // PUT: api/users/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (user == null || id != user.Id)
            {
                return BadRequest(new { message = "Invalid user data or ID mismatch" });
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
                {
                    return NotFound(new { message = "User not found" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/users/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
                return BadRequest(new { message = "Email and password are required." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.Password, loginRequest.Password);

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(new { message = "Invalid email or password." });

            if (user.IsBlocked)
            {
                return StatusCode(403, new { message = "User is blocked by admin." });
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new
            {
                token,
                user = new LoginResponseDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    IsBlocked = user.IsBlocked,
                    ProfileImage = user.ProfileImage
                }
            });

        }

        // DELETE: api/users/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
