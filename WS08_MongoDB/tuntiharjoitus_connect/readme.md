# MongoDB CRUD Operations

This project demonstrates how to perform CRUD (Create, Read, Update, Delete) operations using MongoDB.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Navigate to the project directory in your terminal
3. Install dependencies with `npm install`


## Usage

This sample exposes the following endpoints:

- `POST /items`: Create a new item. Send a JSON body with the item details.
- `GET /items`: Read all items. Returns a JSON array of all items.
- `GET /items/:id`: Read a specific item by ID. Replace `:id` with the item ID in the URL.
- `PUT /items/:id`: Update a specific item by ID. Replace `:id` with the item ID in the URL and send a JSON body with the updated item details.
- `DELETE /items/:id`: Delete a specific item by ID. Replace `:id` with the item ID in the URL.

## Testing

Run tests with `postman`. Ensure the MongoDB server is running before executing tests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Jari Kovalainen](mailto:jari.kovalainen@laurea.fi)