using System.Collections.Generic;
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

        public async Task<List<string>> GetFavoriteModels(string userID)
        {
            var user = await userCollection.Find(u => u.Id == userID).FirstOrDefaultAsync();
            var list = user.favorites;
            return list;
        }

        public async Task<User> GetUserByID(string id)
        {
            return await userCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<string> UpdateUser(string userID, User newUser)
        {
            await userCollection.ReplaceOneAsync(u => u.Id == userID, newUser);
            return "Uspesno";
        }
    }
}