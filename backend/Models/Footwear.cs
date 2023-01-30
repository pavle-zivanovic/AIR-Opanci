using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Footwear
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        //pamti se id modela
        public string model { get; set; }

        //pamti se id usera
        public string user { get; set; }

        public List<string> size { get; set; }

        public bool status { get; set; }
    }
}

