const getPostByIdController = (app = require('express')(), service) => {
    app.get('/posts/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const posts = await service.execute(id)
            res.send(posts)
        } catch (e) {
            res.status(404).json(e)
        }
    })
}
module.exports = getPostByIdController;