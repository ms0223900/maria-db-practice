const { postRepo } = require("./postRepo");
const { postMapper } = require("./postMapper");
const { Post } = require("./Post");


function columnChecker(keys = ['id'], rawData = {}) {
    const missedKeys = []
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const val = rawData[key]
        if(val === undefined || val === null) {
            missedKeys.push(key);
        }
    }

    if(missedKeys.length > 0) {
        throw new Error(`${missedKeys.join(', ')} REQUIRED!!`)
    }
}
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
    async function execute(title, description, content) {
        columnChecker(['title', 'description', 'content'], { title, description, content })

        const newPost = Post({ title, description, content })
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
    async function execute(id, title, description) {
        columnChecker(['id', 'title'], { id, title })

        const oldPost = await repo.findById(id)
        // console.log('old', oldPost)
        const updatedPost = Post({ ...oldPost, title, description })
        await repo.updatePost(updatedPost)
        return updatedPost
    }
    return ({
        execute,
    })
}

const deletePostService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )
    async function execute(id) {
        columnChecker(['id'], { id })
        await repo.deletePost(id)
        return id
    }
    return ({
        execute,
    })
}
module.exports = {
    getPostService,
    addPostService,
    updatePostService,
    deletePostService
}