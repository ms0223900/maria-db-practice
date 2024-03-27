const { tagMapper } = require("./tagMapper");
const tagRepo = (mapper = tagMapper()) => ({
    async getTags() {
        try {
            return mapper.getTags()
        } catch (e) {
            throw new Error(e)
        }
    },
})

module.exports = {
    tagRepo,
}
