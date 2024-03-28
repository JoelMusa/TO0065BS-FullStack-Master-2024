const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {

    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Create a single new listing
        await createListing(client,
            {
                name: "Nuorison huoneisto",
                summary: "Täydellinen paikka nuorille bilettäjille",
                bedrooms: 1,
                bathrooms: 1
            }
        );

        // Create 3 new listings
        await createMultipleListings(client, [
            {
                name: "Loputon näköala Tikkurilaan",
                summary: "Nauti loputtomista näkymistä Tikkurilaan tässä upeassa asunnossa",
                property_type: "Kerrostalo",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Yksiö Helsingin keskustassa",
                property_type: "Apartment",
                bedrooms: 1,
                bathroom: 1
            },
            {
                name: "Kaunis huvila meren rannalla",
                summary: "Kaunis huvila meren rannalla, jossa on upeat näkymät auringonlaskuun",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ]);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create a new Airbnb listing
 */
async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

/**
 * Create multiple Airbnb listings
 */
async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}