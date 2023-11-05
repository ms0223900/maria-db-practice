

const postController = (app = require('express')(), service) => {
    app.get('/posts', async (req, res) => {
        const posts = await service.execute()
        res.send(posts)
    })
}
module.exports = postController;