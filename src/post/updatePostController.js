

const updatePostController = (app = require('express')(), service) => {
    app.post('/post/:id', async (req, res) => {

        try {
            const id = parseInt(req.params.id)
            const {
                title,
            } = req.body
           const updatedUser = await service.execute(id, title)
           res.status(201).json(newUser)
        } catch (e) {
            // TODO, better error handling

            res.status(400).json(e)
        }
    })
}
module.exports = {updatePostController};