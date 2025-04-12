namespace BudgetappServer.Dtos;

public class LoginDto
{
    public string UserName { get; set; } = null!; //voi olla säpo tai käyttäjänimi

    public string Password { get; set; } = null!;
}
