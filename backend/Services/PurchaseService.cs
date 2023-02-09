using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Models;
using MongoDB.Driver;

namespace Services
{
    public class PurchaseService
    {
        private readonly IMongoCollection<Purchase> purchaseCollection;

        public PurchaseService(IOptions<AIROpanciDatabaseSettings> AIROpanciDatabaseSettings)
        {
            var mongoClient = new MongoClient(AIROpanciDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(AIROpanciDatabaseSettings.Value.DatabaseName);
            purchaseCollection = mongoDatabase.GetCollection<Purchase>(AIROpanciDatabaseSettings.Value.PurchaseCollectionName);
        }

        public async Task<string> CreatePurchase(Purchase purchase)
        {
            await purchaseCollection.InsertOneAsync(purchase);
            return purchase.Id;
        }

        public async Task<Purchase> GetPurchaseByID(string id)
        {
            return await purchaseCollection.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

    }
}