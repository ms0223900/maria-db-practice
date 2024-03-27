const getPostsController = (app = require('express')(), service, getPostsByTagIdService) => {
    app.get('/posts', async (req, res) => {
        try {
            // TODO
            if (req.query.tag) {
                const tagId = Number(req.query.tag);
                // TODO, 驗證 tagId？
                const posts = await getPostsByTagIdService.execute(tagId);
                res.send(posts)
                return
            }
            const posts = await service.execute()
            res.send(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    })
}
module.exports = getPostsController;
