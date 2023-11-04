require("dotenv").config()

const mariadb = require("mariadb")

console.log(mariadb)
console.log(process.env.MARIA_DB_HOST)
