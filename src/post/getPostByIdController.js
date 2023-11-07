const getPostByIdController = (app = require('express')(), service) => {
    app.get('/post/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const posts = await service.execute(id)
            res.send(posts)
        } catch (e) {
            console.log()
            if(e.message === 'NOT_FOUND') {
                return res.status(404).send(e.message)
            }
            res.status(500).json(e)
        }
    })
}
module.exports = { getPostByIdController };
