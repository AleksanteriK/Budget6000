using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetappServer.Services;
using BudgetappServer.Dtos;
using BudgetappServer.Models;
using BCrypt;
using MongoDB.Bson;

namespace BudgetappServer.Controllers;

[ApiController]
[Route("api/user")]

public class Usercontroller : ControllerBase
{
    private readonly Userservice _userService;
    private readonly IConfiguration _configuration;

    public Usercontroller(Userservice userService, IConfiguration configuration)
    {
        _userService = userService;
        _configuration = configuration;
    }

    [HttpPost("new")]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserDto newUserDto)
    {
        var users = await _userService.GetUsersAsync();

        //tarkistetaan, ettei luo uutta käyttäjää nimellä säpolla tai numerolla joka on jo olemassa
        foreach (var user in users)
        {
            if (user.Username.Equals(newUserDto.Username, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest($"Cannot create the user, username {newUserDto.Username} already exists.");
            }

            if (user.Email.Equals(newUserDto.Email, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest($"Cannot create the user, user with email address {newUserDto.Email} already exists.");
            }

            if (user.Phone.Equals(newUserDto.Phone))
            {
                return BadRequest($"Cannot create the user, user with phone number {newUserDto.Phone} already exists.");
            }
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUserDto.Password);

        var newUser = new User
        {
            Username = newUserDto.Username,
            Firstname = newUserDto.Firstname,
            Lastname = newUserDto.Lastname,
            Password = hashedPassword,
            Email = newUserDto.Email,
            Salary = (int)newUserDto.Salary,
            HousingAllowance = (int)newUserDto.HousingAllowance,
            StudyAllowance = (double)newUserDto.StudyAllowance,
            OtherIncome = newUserDto.OtherIncome ?? new List<int>(),  // Default to empty list if null
            Rent = (int)newUserDto.Rent,
            Mortage = (int)newUserDto.Mortage,
            ElectricityBill = (int)newUserDto.ElectricityBill,
            Food = (int)newUserDto.Food,
            OtherExpenses = newUserDto.OtherExpenses ?? new List<int>(),  // Default to empty list if null
            Phone = newUserDto.Phone
        };

        await _userService.PostUserAsync(newUser);

        return CreatedAtAction(nameof(GetMyData), new { id = newUser.Id }, newUser.Username);
    }

    [Authorize]
    [HttpGet("myinformation")]
    public async Task<ActionResult<User>> GetMyData()
    {
        var userIdInToken = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdInToken))
        {
            return Unauthorized("Bad token");
        }

        var myData = await _userService.GetUserByIdAuthAsync(userIdInToken);

        if (myData == null)
        {
            return NotFound("No data available");
        }

        return Ok(myData);
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userService.ValidateUserAsync(loginDto.UserName, loginDto.Password);

        if (user == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        var userIdString = user.Id.ToString();

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userIdString)
        };

        var JWT_secretKey = System.Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken
        (
            _configuration["JwtSettings:Issuer"],
            _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new { Token = jwt });
    }
}

