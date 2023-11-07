const getTagsController = (app = require('express')(), service) => {
    app.get('/tags', async (req, res) => {
        try {
            const tags = await service.execute()
            res.send(tags)
        } catch (e) {
            res.status(500).json(e)
        }
    })
}
module.exports = getTagsController;