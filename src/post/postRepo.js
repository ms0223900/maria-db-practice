const { Post } = require("./Post");
const postRepo = (mapper) => ({
    async getPosts() {
        try {
            const res = mapper.getPosts()
            return res
        } catch (e) {
            throw new Error(e)
        }
    },
    async findById(id = 0) {
        try {
            const res = mapper.findPostById(id)
            return res
        } catch (e) {
            throw new Error(e)
        }
    },
    async addPost(post = Post()) {
        try {
            const res = mapper.addPost(post)
            return res
        } catch (e) {
            throw new Error(e)
        }
    },
    async updatePost(post = Post()) {
        try {
            const res = mapper.updatePost(post)
            return res
        } catch (e) {
            throw new Error(e)
        }
    },
    async deletePost(id) {
        try {
            const res = mapper.deletePost(id)
            return res
        } catch (e) {
            throw new Error(e)
        }
    }
})

module.exports = {postRepo};