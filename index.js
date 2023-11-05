const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const getPostsController = require('./src/post/postController')

const db = require('./db')
const { getPostService } = require("./src/post/postServices");
const { addPostController } = require("./src/post/addPostController");
const { addPostService } = require("./src/post/postServices");
const { updatePostController } = require("./src/post/updatePostController");
const { updatePostService } = require("./src/post/postServices");

const APP_PORT = 3000;

async function main() {
    let conn;
    conn = await db.pool.getConnection()

    try {
        getPostsController(app, getPostService(conn))
        addPostController(app, addPostService(conn))
        updatePostController(app, updatePostService(conn))
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