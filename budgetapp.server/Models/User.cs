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
    public int Salary { get; set; }

    [BsonElement("housing_allowance")]
    public int HousingAllowance { get; set; }

    [BsonElement("study_allowance")]
    public double StudyAllowance { get; set; }

    [BsonElement("other_income")]
    public List<int> OtherIncome { get; set; }

    [BsonElement("rent")]
    public int Rent { get; set; }

    [BsonElement("mortage")]
    public int Mortage { get; set; }

    [BsonElement("electricity_bill")]
    public int ElectricityBill { get; set; }

    [BsonElement("food")]
    public int Food { get; set; }

    [BsonElement("other_expenses")]
    public List<int> OtherExpenses { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }
}
