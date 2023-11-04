require("dotenv").config()
const mariadb = require("mariadb")

module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: process.env.MARIA_DB_HOST,
        port: process.env.MARIA_DB_PORT,
        user: process.env.MARIA_DB_USER,
        password: process.env.MARIA_DB_PASSWORD,
        database: process.env.MARIA_DB_DATABASE
    })
});