using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BudgetappServer.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("username")]
    public string Username { get; set; }

    [BsonElement("firstname")]
    public string Firstname { get; set; }

    [BsonElement("lastname")]
    public string Lastname { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }

    [BsonElement("salary")]
    public double Salary { get; set; }

    [BsonElement("housing_allowance")]
    public double HousingAllowance { get; set; }

    [BsonElement("study_allowance")]
    public double StudyAllowance { get; set; }

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
    public string Email { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }
}
