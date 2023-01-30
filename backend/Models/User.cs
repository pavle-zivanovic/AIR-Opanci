using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string firstname { get; set; }

        public string lastname { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public string address { get; set; }

        public string phone { get; set; }

        [BsonElement("purchased items")]
        public List<string> items { get; set; } = null!;

        public List<string> favorites { get; set; } = null!;

        public List<string> postedItems { get; set; } = null!;
    }
}