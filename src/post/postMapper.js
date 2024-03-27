const postMapper = (dbConnection) => ({
    async getPosts() {
        const SQL = "SELECT * FROM mydb.posts";
        try {
            const res = await dbConnection.query(SQL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    async addPost(post) {
        const SQL = "INSERT INTO mydb.posts (title, description, content)" +
            "VALUES (?, ?, ?);";
        try {
            const res = await dbConnection.query({
                sql: SQL,
                supportBigNumbers: true,
                insertIdAsNumber: true,
            }, [post.title, post.description, post.content]);

            return res.insertId;
        } catch (error) {
            throw error;
        }
    },

    async findPostById(id = 0) {
        const SQL = "SELECT * FROM mydb.posts WHERE id = ?";
        try {
            const res = await dbConnection.query(SQL, id);
            return res[0];
        } catch (error) {
            throw error;
        }
    },

    async updatePost(post) {
        const SQL = "UPDATE mydb.posts t SET title = ?, description = ? WHERE id = ?";
        try {
            const res = await dbConnection.query(SQL, [post.title, post.description, post.id]);
            return res;
        } catch (error) {
            throw error;
        }
    },

    async deletePost(id) {
        const SQL = "DELETE FROM mydb.posts WHERE id = ?"
        try {
            const res = await dbConnection.query(SQL, id);
            return res;
        } catch (error) {
            throw error;
        } finally {
            dbConnection.release()
        }
    },
})
module.exports = { postMapper };
