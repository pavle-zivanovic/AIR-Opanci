using System;
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

        public async Task<Model> GetModelByID(string id)
        {
            return await modelCollection.Find(m => m.Id == id).FirstOrDefaultAsync();
        }

        public async Task<string> UpdateModel(string modelID, Model newModel)
        {
            await modelCollection.ReplaceOneAsync(m => m.Id == modelID, newModel);
            return "Uspesno";
        }

        public async Task<List<Model>> SearchModels(string search)
        {
            return await modelCollection.Find(m => 
            m.brand.ToLower().Equals(search.ToLower().Trim()) || 
            m.name.ToLower().Equals(search.ToLower().Trim()) || 
            m.type.ToLower().Equals(search.ToLower().Trim())
            ).ToListAsync();
        }

        public async Task<List<Model>> FilterModels(string _categories, string _brands, string _size, string _price)
        {
            List<string> categories = new List<string>();
            var categoriesTemp = _categories.Split(",");
            foreach(string i in categoriesTemp)
            {
                categories.Add(i);
            }

            List<string> brands = new List<string>();
            var brandsTemp = _brands.Split(",");
            foreach(string i in brandsTemp)
            {
                brands.Add(i);
            }

            List<string> size = new List<string>();
            var sizeTemp = _size.Split(",");
            foreach(string i in sizeTemp)
            {
                size.Add(i);
            }

            var priceTemp = _price.Split(",");
            List<string> price = new List<string>();
            foreach(string i in priceTemp)
            {
                var tmp = i.Split("-");
                foreach(string j in tmp)
                {
                    price.Add(j);
                }
            }

            List<double> priceD = new List<double>();
            foreach(string i in price)
            {
                double j = Convert.ToDouble(i);
                priceD.Add(j);
            }

            return await modelCollection.Find(m =>
            categories.Contains(m.type) || brands.Contains(m.brand) ||
            (m.price > priceD[0] && m.price < priceD[price.Count-1]))
            .ToListAsync();
        }
    }
}