const deletePostController = (app = require('express')(), service) => {
    app.delete('/post/:id', async (req, res) => {
        try {
           const id = parseInt(req.params.id)
           const deleted = await service.execute(id)
           res.status(200).json(deleted)
        } catch (e) {
            res.status(400).json(e.message || e)
        }
    })
}
module.exports = {deletePostController};