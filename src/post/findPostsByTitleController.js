const findPostsByTitleController = (app = require('express')(), service) => {
    app.post('/post/search/:search', async (req, res) => {

        try {
            const {
                search
            } = req.params
            const posts = await service.execute(search)
            res.status(201).json(posts)
        } catch (e) {
            res.status(400).json(e.message || e)
        }
    })
}
module.exports = { findPostsByTitleController };
