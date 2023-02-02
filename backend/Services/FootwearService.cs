using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Models;
using MongoDB.Driver;

namespace Services
{
    public class FootwearService
    {
        private readonly IMongoCollection<Footwear> footwearCollection;

        public FootwearService(IOptions<AIROpanciDatabaseSettings> AIROpanciDatabaseSettings)
        {
            var mongoClient = new MongoClient(AIROpanciDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(AIROpanciDatabaseSettings.Value.DatabaseName);
            footwearCollection = mongoDatabase.GetCollection<Footwear>(AIROpanciDatabaseSettings.Value.FootwearCollectionName);
        }

        public async Task<string> CreateFootwear(Footwear footwear)
        {
            await footwearCollection.InsertOneAsync(footwear);
            return "Uspesno";
        }

        public async Task<List<Footwear>> GetAllFootwear()
        {
            return await footwearCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Footwear> GetFootwearByID(string id)
        {
            return await footwearCollection.Find(f => f.Id == id).FirstOrDefaultAsync();
        }
        
        public async Task<string> DeleteFootwear(string id)
        {
            await footwearCollection.DeleteOneAsync(f => f.Id == id);
            return "Uspesno";
        }
    }
}

