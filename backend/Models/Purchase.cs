using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Purchase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        //pamti se id usera
        public string user { get; set; }

        //pamti se id obuce
        public List<string> footwear { get; set; }

        public string date { get; set; }

        public int cena { get; set; }
    }
}