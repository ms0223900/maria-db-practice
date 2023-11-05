const express = require('express');
const app = express();

const postController = require('./src/post/postController')

const db = require('./db')
const { getPostService } = require("./src/post/postServices");

const APP_PORT = 3000;
async function main() {
    let conn;
    conn = await db.pool.getConnection()
    try {
        postController(app, getPostService(conn))
    } catch (err) {
        console.log("Error: ", err)
    } finally {
        // console.log('final')
        // conn && conn.end()
    }

    app.listen(APP_PORT, () => {
        console.log(`Example app listening on port ${APP_PORT}`)
    })
}

main()