

const postController = (app = require('express')(), service) => {
    app.get('/posts', async (req, res) => {
        const posts = await service.execute()
        res.send(posts)
    })

    app.post('/post', async (req, res) => {
        const {
            title,
        } = req.body
    })
}
module.exports = postController;