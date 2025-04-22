using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BudgetappServer.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("username")]
    public string Username { get; set; } = null!;

    [BsonElement("firstname")]
    public string Firstname { get; set; } = null!;

    [BsonElement("lastname")]
    public string Lastname { get; set; } = null!;

    [BsonElement("password")]
    public string Password { get; set; } = null!;

    [BsonElement("salary")]
    public double Salary { get; set; }

    [BsonElement("housing_allowance")]
    public double HousingAllowance { get; set; }

    [BsonElement("study_allowance")]
    public double StudyAllowance { get; set; }

    [BsonElement("study_allowance_months")]
    public int StudyAllowanceMonths { get; set; }

    [BsonElement("other_income")]
    public List<double> OtherIncome { get; set; }

    [BsonElement("rent")]
    public double Rent { get; set; }

    [BsonElement("mortage")]
    public double Mortage { get; set; }

    [BsonElement("electricity_bill")]
    public double ElectricityBill { get; set; }

    [BsonElement("food")]
    public double Food { get; set; }

    [BsonElement("other_expenses")]
    public List<double> OtherExpenses { get; set; }

    [BsonElement("email")]
    public string Email { get; set; } = null!;

    [BsonElement("phone")]
    public string Phone { get; set; }
}
