const postRepo = (mapper) => ({
    async getPosts() {
        try {
            const res = mapper.getPosts()
            return res
        } catch (e) {
            throw new Error(e)
        }
    }
})

module.exports = {postRepo};