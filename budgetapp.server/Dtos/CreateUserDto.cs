using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

public class CreateUserDto
{
    [Required] public string Username { get; set; } = null!;
    [Required] public string Firstname { get; set; } = null!;

    [Required] public string Lastname { get; set; } = null!;

    [Required] public string Password { get; set; } = null!;

    [Required] public string Email { get; set; } = null!;

    public double? Salary { get; set; }

    public double? HousingAllowance { get; set; }

    public double? StudyAllowance { get; set; }

    public List<double>? OtherIncome { get; set; }

    public double? Rent { get; set; }

    public double? Mortage { get; set; }

    public double? ElectricityBill { get; set; }

    public double? Food { get; set; }

    public List<double>? OtherExpenses { get; set; }

    public string? Phone { get; set; }
}
