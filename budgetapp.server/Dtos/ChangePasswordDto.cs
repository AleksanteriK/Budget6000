using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

public class ChangePasswordDto
{
    [Required] public string Username { get; set; } = null!;

    [Required] public string OldPassword { get; set; } = null!;

    [Required] public string NewPassword { get; set; } = null!;
}
