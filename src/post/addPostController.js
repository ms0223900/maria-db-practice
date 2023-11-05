

const addPostController = (app = require('express')(), service) => {
    app.post('/post', async (req, res) => {

        try {
            const {
                title,
            } = req.body
           const newUser = await service.execute(title)
           res.status(201).json(newUser)
        } catch (e) {
            // TODO, better error handling

            res.status(400).json(e)
        }
    })
}
module.exports = {addPostController};