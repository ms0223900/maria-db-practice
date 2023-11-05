const getPostService = (dbConnection) => {
    async function execute() {
        const SQL = "SELECT * FROM mydb.posts";
        try {
            const res = await dbConnection.query(SQL);
            return res;
        }catch (error) {
            throw error;
        }
    }
    return ({
        execute,
    })
}

module.exports = {
    getPostService,
}