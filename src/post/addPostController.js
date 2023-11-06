

const addPostController = (app = require('express')(), service) => {
    app.post('/post', async (req, res) => {

        try {
            const {
                title,
                description,
                content,
            } = req.body
           const newId = await service.execute(title, description, content)
            console.log('newId', newId)
           res.status(201).json(newId)
        } catch (e) {
            // TODO, better error handling

            res.status(400).json(e.message || e)
        }
    })
}
module.exports = {addPostController};