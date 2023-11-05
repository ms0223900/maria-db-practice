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

const updatePostService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )
    async function execute(id, title) {
        // TODO, column checker?
        if(!id) throw new Error('Id required!')
        if(!title) throw new Error('title required')

        const oldPost = await repo.findById(id)
        // console.log('old', oldPost)
        const updatedPost = Post({ ...oldPost, title, })
        await repo.updatePost(updatedPost)
        return updatedPost
    }
    return ({
        execute,
    })
}

module.exports = {
    getPostService,
    addPostService,
    updatePostService,
}