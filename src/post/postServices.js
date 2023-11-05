const { postRepo } = require("./postRepo");
const { postMapper } = require("./postMapper");
const getPostService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )
    async function execute() {
        const res = await repo.getPosts()
        return res
    }
    return ({
        execute,
    })
}

module.exports = {
    getPostService,
}