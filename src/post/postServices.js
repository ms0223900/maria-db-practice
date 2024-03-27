const { postRepo } = require("./postRepo");
const { postMapper } = require("./postMapper");
const { Post, AddPostDbDto } = require("./Post");
const { columnChecker } = require("../utils");
const { tagRepo } = require("../tag/tagRepo");


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

const getPostsByTagIdService = (dbConnection) => {
    const repo = postRepo(
        postMapper(dbConnection)
    )

    //

    async function execute(tagId) {
        const postTags = await dbConnection.query("SELECT * FROM mydb.postTags") || [];
        console.log("postTags: ", postTags);
        // TODO
        const postIdTagIdsMap = postTags.reduce((prev, next) => {
            if (!prev[next.postId]) {
                prev[next.postId] = []
            }
            prev[next.postId].push(next.tag)
            return prev;
        }, {});
        const postIdsFoundByTag = postTags.filter(postTag => postTag.tag === tagId).map(pt => pt.postId);
        console.log("postIdsFoundByTag: ", postIdsFoundByTag);
        columnChecker(['id'], { id: tagId })
        const posts = await repo.getPosts();
        console.log("posts: ", posts);
        const res = posts.map(post => ({
            ...post,
            tags: postIdTagIdsMap[post.id]
        })).filter(post => postIdsFoundByTag.includes(post.id));
        if (!res) throw new Error('NOT_FOUND')
        return res
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
    getPostsByTagIdService,
}
