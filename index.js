const express = require('express');
const app = express();

const postController = require('./src/post/postController')

const db = require('./db')

const APP_PORT = 3000;


// async function query(dbConnection) {
//     const SQL = "SELECT * FROM mydb.posts";
//     try {
//         const res = await dbConnection.query(SQL);
//         return res;
//     }catch (error) {
//         throw error;
//     }
// }

async function main() {
    // let conn;
    // conn = await db.pool.getConnection()
    // try {
    //     const res = await query(conn)
    //     console.log(res)
    // } catch (err) {
    //     console.log("Error: ", err)
    // } finally {
    //     console.log('final')
    //     conn && conn.end()
    // }
    postController(app)
    app.listen(APP_PORT, () => {
        console.log(`Example app listening on port ${APP_PORT}`)
    })
}

main()