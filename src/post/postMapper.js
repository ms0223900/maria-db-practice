const postMapper = (dbConnection) => ({
    async getPosts() {
        const SQL = "SELECT * FROM mydb.posts";
        try {
            const res = await dbConnection.query(SQL);
            return res;
        }catch (error) {
            throw error;
        }
    }
})
module.exports = {postMapper};