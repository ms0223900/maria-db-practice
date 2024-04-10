const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const getPostsController = require('./src/post/postController')

const db = require('./db')
const {
    getPostService, addPostService, updatePostService, deletePostService, getPostByIdService,
    findPostsByTitleService, getPostsByTagIdService
} = require("./src/post/postServices");
const { addPostController } = require("./src/post/addPostController");
const { updatePostController } = require("./src/post/updatePostController");
const { deletePostController } = require("./src/post/deletePostController");
const { getPostByIdController } = require("./src/post/getPostByIdController");
const { findPostsByTitleController } = require("./src/post/findPostsByTitleController");
const { getTagsController } = require("./src/tag/getTagsController");
const { getTagsService } = require("./src/tag/tagServices");
const { postRepo } = require("./src/post/postRepo");
const { postMapper } = require("./src/post/postMapper");

const APP_PORT = 3000;

async function main() {
    let conn;
    conn = await db.pool.getConnection()

    try {
        getPostsController(app, getPostService(postRepo(postMapper(conn))), getPostsByTagIdService(postRepo(postMapper(conn))))
        addPostController(app, addPostService(conn))
        updatePostController(app, updatePostService(conn))
        deletePostController(app, deletePostService(conn))
        getPostByIdController(app, getPostByIdService(conn))
        findPostsByTitleController(app, findPostsByTitleService(conn))

        getTagsController(app, getTagsService(conn))

        // TODO
        // home api(includes posts and tags...)
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
