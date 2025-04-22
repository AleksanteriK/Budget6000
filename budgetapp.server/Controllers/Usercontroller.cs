using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetappServer.Services;
using BudgetappServer.Dtos;
using BudgetappServer.Models;
using MongoDB.Driver;

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

        //tehään kopio ja palautetaan kaikki paitsi salasana
        var passwordlessData = new User
        {
            Id = myData.Id,
            Username = myData.Username,
            Firstname = myData.Firstname,
            Lastname = myData.Lastname,
            Salary = myData.Salary,
            HousingAllowance = myData.HousingAllowance,
            StudyAllowance = myData.StudyAllowance,
            OtherIncome = myData.OtherIncome,
            StudyAllowanceMonths = myData.StudyAllowanceMonths,
            Rent = myData.Rent,
            Mortage = myData.Mortage,
            ElectricityBill = myData.ElectricityBill,
            Food = myData.Food,
            OtherExpenses = myData.OtherExpenses,
            Email = myData.Email,
            Phone = myData.Phone
        };

        return Ok(passwordlessData);
    }

    [Authorize]
    [HttpPatch("myinformation")]
    public async Task<ActionResult> UpdateData([FromBody] UpdateUserDto updatedData)
    {
        var userIdInToken = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdInToken))
        {
            return Unauthorized("Bad token");
        }

        if (updatedData == null)
        {
            return BadRequest("No data was found");
        }

        var userData = await _userService.GetUserByIdAuthAsync(userIdInToken);

        if (userData == null)
        {
            return NotFound("No data available");
        }

        var properties = typeof(UpdateUserDto).GetProperties();

        //muutetaan haluttu data
        foreach (var property in properties)
        {
            var newValue = property.GetValue(updatedData);

            if (newValue != null)
            {
                var modifiedProperty = typeof(User).GetProperty(property.Name);

                if (modifiedProperty != null && modifiedProperty.CanWrite)
                {
                    modifiedProperty.SetValue(userData, newValue);
                }
            }
        }

        await _userService.UpdateUserDataAsync(userIdInToken, userData);

        return Ok();
    }

    [Authorize]
    [HttpPatch("newpassword")]
    public async Task<ActionResult> ChangePasswordInActiveSession([FromBody] ChangePasswordDto PasswordChangeDto)
    {
        var user = await _userService.GetUserByUserNameAsync(PasswordChangeDto.Username);

        if (user == null)
        {
            return Unauthorized("Wrong username.");
        }

        var userIdInToken = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdInToken))
        {
            return Unauthorized("Bad token");
        }

        if (!BCrypt.Net.BCrypt.Verify(PasswordChangeDto.OldPassword, user.Password))
        {
            return Unauthorized("Old password is incorrect.");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(PasswordChangeDto.NewPassword);

        var update = Builders<User>.Update.Set(u => u.Password, hashedPassword);

        var updateResult = await _userService.UpdateUserPasswordAsync(user.Id, update);

        if (updateResult.ModifiedCount == 1)
        {
            return Ok("Password updated successfully.");
        }

        else
        {
            return StatusCode(500, "Failed to update password.");
        }
    }

    [HttpPost("new")]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserDto newUserDto)
    {
        var users = await _userService.GetUserDataAsync();

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
            Phone = newUserDto.Phone
        };

        await _userService.PostUserAsync(newUser);

        return CreatedAtAction(nameof(GetMyData), new { id = newUser.Id }, newUser.Username);
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

    [Authorize]
    [HttpDelete("myinformation")]
    public async Task<ActionResult> DeleteUser()
    {
        var userIdInToken = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userIdString = userIdInToken.ToString();

        if (string.IsNullOrEmpty(userIdInToken))
        {
            return Unauthorized("Bad token");
        }

        bool deletionSuccessful = await _userService.DeleteUserAsync(userIdString);

        if (deletionSuccessful == true)
        {
            return NoContent();
        }

        else
        {
            return StatusCode(500, "Something went wrong on the server side, could not delete any data");
        }
    }
}

