const getPostsController = (app = require('express')(), getPostsService, getPostsByTagIdService) => {
    return app.get('/posts', async (req, res) => {
        try {
            // TODO
            if (req.query?.tag) {
                const tagId = Number(req.query.tag);
                // TODO, 驗證 tagId？
                const posts = await getPostsByTagIdService.execute(tagId);
                res.send(posts)
                return
            }
            const posts = await getPostsService.execute()
            res.send(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    })
}
module.exports = getPostsController;
