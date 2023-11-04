const db = require('./db')

async function query(dbConnection) {
    const SQL = "SELECT * FROM mydb.posts";
    try {
        const res = await dbConnection.query(SQL);
        return res;
    }catch (error) {
        throw error;
    }
}

async function main() {
    let conn;
    conn = await db.pool.getConnection()
    try {
        const res = await query(conn)
        console.log(res)
    } catch (err) {
        console.log("Error: ", err)
    } finally {
        console.log('final')
        conn && conn.end()
    }
}

main()