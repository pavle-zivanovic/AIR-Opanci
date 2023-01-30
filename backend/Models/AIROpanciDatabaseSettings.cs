
namespace Models
{
    public class AIROpanciDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string FootwearCollectionName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;

        public string ModelCollectionName { get; set; } = null!;

        public string PurchaseCollectionName { get; set; } = null!;
    }
}