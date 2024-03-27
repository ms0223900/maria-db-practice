const tagMapper = (dbConnection) => ({
    async getTags() {
        try {
            return dbConnection.query("SELECT * FROM mydb.tags");
        } catch (error) {
            throw error;
        }
    },
})

module.exports = {
    tagMapper,
}
