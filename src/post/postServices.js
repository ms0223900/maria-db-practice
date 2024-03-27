const { postRepo } = require("./postRepo");
const { postMapper } = require("./postMapper");
const { Post, AddPostDbDto } = require("./Post");
const { columnChecker } = require("../utils");


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

const getPostByIdService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )

    async function execute(id) {
        columnChecker(['id'], { id })
        const res = await repo.findById(id)
        if (!res) throw new Error('NOT_FOUND')
        return res
    }

    return ({
        execute,
    })
}


const findPostsByTitleService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )

    async function execute(search) {
        columnChecker(['search'], { search })
        const posts = await repo.getPosts()
        const res = posts.filter(post => post.title.includes(search));
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
        columnChecker(['title'], { title })

        const addPostDbDto = AddPostDbDto({ title, description, content })
        const newPostId = await repo.addPost(addPostDbDto)
        const res = Post({ ...addPostDbDto, id: newPostId, })
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
    getPostByIdService,
    addPostService,
    updatePostService,
    deletePostService,
    findPostsByTitleService,
}
