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
    async addPost(post = Post()) {
        try {
            const res = mapper.addPost(post)
            return res
        } catch (e) {
            throw new Error(e)
        }
    }

})

module.exports = {postRepo};