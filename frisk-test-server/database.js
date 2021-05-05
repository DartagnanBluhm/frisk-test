const Pool = require("pg").Pool;
//Database details
const pool = new Pool({
    user: "postgres",
    password: "zxcvzxcv",
    host: "localhost",
    port: 5432,
    database: "friskdevtest"
})
module.exports = pool;