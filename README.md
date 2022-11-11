# Storefront Backend Project

## Setup

### Install project dependencies 
Run 'npm install' or yarn 

### Create databases
Create Database 'shopping' and 'shopping_test' in postgres

### Create user
Create a new user in postgres
Ex: CREATE USER tom WITH PASSWORD 'myPassword';

### Grant all priveleges
Grant the new user all privileges on both the databases 
Ex: GRANT ALL PRIVILEGES ON DATABASE shopping to tom;
    GRANT ALL PRIVILEGES ON DATABASE shopping_test to tom;

### Create .env file
This file will hold the data used to connect to the database as well as some other important variables.
Please create one that matches the following example and channge the values to your own:

    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=shopping
    POSTGRES_TEST_DB=shopping_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=pass123
    BCRYPT_PASSWORD=open-sesame
    SALT_ROUNDS=10
    TOKEN_SECRET=avadacadabra
    ENV=dev

[note] Please update `database.json` accordig to the values in this file

### Migrate
run 'db-migrate up' to automatically create your database schema according to the one in `REQUIREMENTS.md`.

### Scripts 
1. run 'npm run watch' or 'yarn watch' to launch the servver to listen on the API endpoints.
2. run 'npm run test' or 'yarn test' to run all tests of the project, please look at the notes at the end of the document before running this command.

## Project information

### Ports
The backend runs on port 3000
The database runs on port 5432

### Endpoints
Can be found with detailed documentation in the `REQUIREMENTS.md` file.
Below is a link to a postman collection that successfully calls each endpoint of the API
[Note:] You might need to generate a different bearer token to the one saved in the collection if you changed the TOKEN_SECRET variable in the .env file

[Run in Postman](https://god.postman.co/run-collection/a4d2fee5f4ce12e095ca?action=collection%2Fimport)

## Important Notes

Please note that:
1. the [ENV] variable in the `.env` file needs to be manually updated to test before running 'npm run test'
2. If a test fails, please run 'db-migrate db:drop shopping_test' to drop the test database and run the       command again.