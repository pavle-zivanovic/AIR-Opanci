using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Models;
using MongoDB.Driver;

namespace Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> userCollection;

        public UserService(IOptions<AIROpanciDatabaseSettings> AIROpanciDatabaseSettings)
        {
            var mongoClient = new MongoClient(AIROpanciDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(AIROpanciDatabaseSettings.Value.DatabaseName);
            userCollection = mongoDatabase.GetCollection<User>(AIROpanciDatabaseSettings.Value.UserCollectionName);
        }

        public async Task<string> CreateUser(User user)
        {
            await userCollection.InsertOneAsync(user);
            return "Uspesno";
        }
    }
}