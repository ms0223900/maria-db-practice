

const postController = (app = require('express')()) => {
    app.get('/posts', async (req, res) => {

        res.send('hi')
    })
}
module.exports = postController;