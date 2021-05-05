# Frisk-Test Backend API

## Setup

To allow the API to communicate with a local PostgreSQL database, the supplied `database_init.sql` script can be used to create the necessary database and table. However, the `database.js` file must also be updated with the relivant details to point to this database.

## Startup
Once the database has been configured, the API can be started up via `node index.js`.