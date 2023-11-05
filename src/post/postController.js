

const postController = (app = require('express')(), service) => {
    app.get('/posts', async (req, res) => {
        try {
            const posts = await service.execute()
            res.send(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    })

    app.post('/post', async (req, res) => {
        const {
            title,
        } = req.body
    })
}
module.exports = postController;