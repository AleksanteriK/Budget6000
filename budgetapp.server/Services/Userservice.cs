using MongoDB.Driver;
using BudgetappServer.Models;
using Microsoft.Extensions.Options;

namespace BudgetappServer.Services;

public class Userservice
{
    public IMongoCollection<User> _userCollection;

    public Userservice (IOptions<BudgetAppDatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var _database = mongoClient.GetDatabase(settings.Value.DatabaseName);

        _userCollection = _database.GetCollection<User>(settings.Value.UserCollectionName);
    }

    public async Task<List<User>> GetUsersAsync() =>
        await _userCollection.Find(_ => true).ToListAsync();

    public async Task PostUserAsync(User newUser)
    {
        await _userCollection.InsertOneAsync(newUser);
    }

    //voi löytää käyttäjän myös sähköpostilla jos username on payloadissa säpo
    public async Task<User?> GetUserByUserNameAsync(string username)
    {
        User user = await _userCollection.Find(user => user.Username == username).FirstOrDefaultAsync();
        user ??= await _userCollection.Find(user => user.Email.ToLower() == username.ToLower()).FirstOrDefaultAsync();

        return user;
    }

    public async Task<User?> GetUserByIdAuthAsync(string userId)
    {
        User user = await _userCollection.Find(user => user.Id == userId).FirstOrDefaultAsync();

        return user;
    }

    //autentikointi
    public async Task<User?> ValidateUserAsync(string username, string password)
    {
        User expectedUser = await GetUserByUserNameAsync(username);

        if (expectedUser == null)
        {
            return null;
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, expectedUser.Password);

        if (!isPasswordValid)
        {
            return null;
        }

        return expectedUser;
    }
}
