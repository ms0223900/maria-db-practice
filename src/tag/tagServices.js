const { tagRepo } = require("./tagRepo");
const { tagMapper } = require("./tagMapper");
const getPostService = (dbConnection) => {
    const repo = tagRepo(
        tagMapper(dbConnection)
    )
    async function execute() {
        const res = await repo.getTags()
        return res
    }
    return ({
        execute,
    })
}
