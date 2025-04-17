using System.ComponentModel.DataAnnotations;

namespace BudgetappServer.Dtos;

//kaikki on nullable, eli voi päivittää vaikka vaan yhtä tietoa

public class UpdateUserDto
{
    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Password { get; set; }

    public int? Salary { get; set; }

    public int? HousingAllowance { get; set; }

    public double? StudyAllowance { get; set; }

    public List<int>? OtherIncome { get; set; }

    public int? Rent { get; set; }

    public int? Mortage { get; set; }

    public int? ElectricityBill { get; set; }

    public int? Food { get; set; }

    public List<int>? OtherExpenses { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }
}
