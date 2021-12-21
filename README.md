# Build Week Scaffolding for Node and PostgreSQL

## Video Tutorial

The following tutorial explains how to set up this project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://img.youtube.com/vi/kTO_tf4L23I/maxresdefault.jpg)](https://www.youtube.com/watch?v=kTO_tf4L23I)

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.

# Marketplace API Endpoints

# Base API URL

https://buildweek-marketplace.herokuapp.com/

# auth router endpoints
/auth 

[POST] /auth/register - Creates a new user in 'users' database
The object needs: 
-username: has to be unique, string
-password: a string

example: 

```
{
  "username": "foo",
  "password": "bar"
}
```

returns an object with a welcome message

[POST] /auth/login - Logs in with existing credentials 

# Two users are in the db already if you wish to use them instead of logging in with a new user each time, {username: foo, password: bar} and {username: 1, password: 1} #

The object needs: 
-username: has to exist in the database
-password: has to match exactly 

examples: see above

returns an object of a welcome message and a token required for authenticating access into the other endpoints

it should look like this 

```
{
  "message": "Hello again, (username),
  "token": (long encoded token value)
}
```

# listings router endpoints
/listings

[GET] /listings - Retrieves all listings in listing database

# requires authentication (needs a token to access) 

returns all listings as an array of objects (the database should have 7 or 8 that I made as dummy data)

will look like this, but longer.. 

```
[
  {
    "category": "miscellaneous",
    "description": "Buy my product",
    "listing_id": 7,
    "location_id": 6,
    "name": "autograph",
    "price": 10
  },
  {
    "category": "fruit",
    "description": "yummy",
    "listing_id": 8,
    "location_id": 2,
    "name": "apples",
    "price": 10
  }
]
```

[POST] /listings/create - Adds a new listing to the database

# also requires authentication

object must have: 

-name: required, string
-category: required, string, max 50 chars
-description: required, string, max 150 chars
-price: required, non-zero, integer
-location_id: required, non-zero, integer (points to a preset database table, value must be 1 through 6)

example: 
# note: none of these values have to be unique, you can have two totally identical listings, the listing_id (created by the database) will be different

```
{
  "category": "fruit",
  "description": "yummy",
  "location_id": 2,
  "name": "apples",
  "price": 10
}
```
this endpoint returns the newly created listing as an object