using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

//kaikki on nullable, eli voi päivittää vaikka vaan yhtä tietoa
public class UpdateUserDto
{
    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Password { get; set; }

    public double? Salary { get; set; }

    public double? HousingAllowance { get; set; }

    public double? StudyAllowance { get; set; }

    public List<double>? OtherIncome { get; set; }

    public double? Rent { get; set; }

    public double? Mortage { get; set; }

    public double? ElectricityBill { get; set; }

    public double? Food { get; set; }

    public List<double>? OtherExpenses { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }
}
