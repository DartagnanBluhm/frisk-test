# Frisk-Test Backend API

## Setup

To allow the API to communicate with a local PostgreSQL database, the supplied `database_init.sql` script can be used to create the necessary database and table. However, the `database.js` file must also be updated with the relivant details to point to this database.

To install all dependencies use `npm install` prior to starting up.

## Startup
Once the database has been configured and all dependencies are installed, the API can be booted via `npm start`.