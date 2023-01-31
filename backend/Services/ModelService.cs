using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Models;
using MongoDB.Driver;

namespace Services
{
    public class ModelService
    {
        private readonly IMongoCollection<Model> modelCollection;

        public ModelService(IOptions<AIROpanciDatabaseSettings> AIROpanciDatabaseSettings)
        {
            var mongoClient = new MongoClient(AIROpanciDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(AIROpanciDatabaseSettings.Value.DatabaseName);
            modelCollection = mongoDatabase.GetCollection<Model>(AIROpanciDatabaseSettings.Value.ModelCollectionName);
        }

        public async Task<string> CreateModel(Model model)
        {
            await modelCollection.InsertOneAsync(model);
            return "Uspesno";
        }

        public async Task<List<Model>> GetModelGender(string gender)
        {
            var list = await modelCollection.Find(m => m.gender == gender).ToListAsync();
            return list;
        }

    }
}