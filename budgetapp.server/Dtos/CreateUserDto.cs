﻿using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

public class CreateUserDto
{
    [Required] public string Username { get; set; } = null!;

    [Required] public string Firstname { get; set; } = null!;

    [Required] public string Lastname { get; set; } = null!;

    [Required] public string Password { get; set; } = null!;

    [Required] public string Email { get; set; } = null!;

    [Required] public string Phone { get; set; } = null!;
}
