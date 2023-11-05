const postMapper = (dbConnection) => ({
    async getPosts() {
        const SQL = "SELECT * FROM mydb.posts";
        try {
            const res = await dbConnection.query(SQL);
            return res;
        }catch (error) {
            throw error;
        }
    },

    async addPost(post) {
        const SQL = "INSERT INTO mydb.posts (title)" +
            "VALUES (?);";
        try {
            const res = await dbConnection.query(SQL, post.title);
            dbConnection.save()
            console.log('Add post success')
            return res;
        }catch (error) {
            throw error;
        }
    }

})
module.exports = {postMapper};