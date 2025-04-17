using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

public class CreateUserDto
{
    [Required] public string Username { get; set; } = null!;
    [Required] public string Firstname { get; set; } = null!;

    [Required] public string Lastname { get; set; } = null!;

    [Required] public string Password { get; set; } = null!;

    [Required] public string Email { get; set; } = null!;

    public int? Salary { get; set; }

    public int? HousingAllowance { get; set; }

    public double? StudyAllowance { get; set; }

    public List<int>? OtherIncome { get; set; }

    public int? Rent { get; set; }

    public int? Mortage { get; set; }

    public int? ElectricityBill { get; set; }

    public int? Food { get; set; }

    public List<int>? OtherExpenses { get; set; }

    public string? Phone { get; set; }
}
