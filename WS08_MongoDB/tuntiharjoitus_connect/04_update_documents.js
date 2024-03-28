const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {

    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();


        // UPDATE
        // Print the selected listing
        await findListingByName(client, "Loputon näköala Tikkurilaan");
        // Update the Infinite Views listing to have 6 bedrooms and 8 beds 
        await updateListingByName(client, "Loputon näköala Tikkurilaan", { bedrooms: 6, beds: 8 });
        // Print the updated listing
        await findListingByName(client, "Loputon näköala Tikkurilaan");

        // UPSERT
        // Check if a listing named Cozy Cottage is in the db
        await findListingByName(client, "Cozy Cottage");
        // Upsert the Cozy Cottage listing
        await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });
        // Print the details of the Cozy Cottage listing
        await findListingByName(client, "Cozy Cottage");
        // Upsert the Cozy Cottage listing
        await upsertListingByName(client, "Cozy Cottage", { beds: 2 });
        // Print the details of the Cozy Cottage listing
        await findListingByName(client, "Cozy Cottage");


        // Update all listings so they have a property type
        await updateAllListingsToHavePropertyType(client);
        // Print the details of the Cozy Cottage listing that should now have a property type
        await findListingByName(client, "Cozy Cottage");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);


//  * Update an Airbnb listing with the given name
async function updateListingByName(client, nameOfListing, updatedListing) {

    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

/**
 * Upsert an Airbnb listing with the given name. 
 */
async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing }, { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

/**
 * Update all Airbnb listings that do not have a property type so they have property_type 'Unknown'
 */
async function updateAllListingsToHavePropertyType(client) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateMany for the updateMany() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

/**
 * Print an Airbnb listing with the given name
 */
async function findListingByName(client, nameOfListing) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the db with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}