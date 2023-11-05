const { postRepo } = require("./postRepo");
const { postMapper } = require("./postMapper");
const { Post } = require("./Post");
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
const addPostService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )
    async function execute(title) {
        // TODO, column checker?
        if(!title) throw new Error('title required')

        const newPost = Post({ title })
        const res = await repo.addPost(newPost)
        return res
    }
    return ({
        execute,
    })
}


module.exports = {
    getPostService,
    addPostService,
}