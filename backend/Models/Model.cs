using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Model
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string brand { get; set; }

        public string name { get; set; }

        public string type { get; set; }

        public double price { get; set; }

        //pamtimo listu id-eva obuce
        public List<string> items { get; set; }

        public string image { get; set; }

        public int discount { get; set; }

        public string gender { get; set; }

        public string user {get ;set;}

        //pamtimo listu id-eva usera koji su lajkovali model
        public List<string> users { get; set; }
    }
}
