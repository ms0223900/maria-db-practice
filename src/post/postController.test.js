const getPostsController = require("./postController");
const { Post } = require("./Post");

// 以下僅為 controller 和 service 外圍之測試，並沒有真的塞資料到 db 層
describe('post controller', function () {
    function givenApp(req = {}) {
        const spySend = jest.fn();
        const res = {
            send: spySend,
        };
        const app = jest.fn();
        app.mockReturnValue({
            async get(_, cb) {
                await cb(req, res)
            }
        })
        return { spySend, app };
    }

    function givenPostService(response = [
        Post({
            id: 0,
        })
    ]) {
        const getPostsService = jest.fn();
        getPostsService.mockReturnValue({
            execute() {
                return Promise.resolve(response);
            }
        })
        return getPostsService;
    }

    function givenPostsByTagIdService(response = [
        Post({
            id: 0,
        }),
        Post({
            id: 1,
        })
    ]) {
        const getPostsByTagIdService = jest.fn();
        getPostsByTagIdService.mockReturnValue({
            execute() {
                return response;
            }
        })
        return getPostsByTagIdService;
    }

    it('all ok when no req', async () => {
        const { spySend, app } = givenApp();
        const response = [
            Post({ id: 0 }),
            Post({ id: 1 }),
            Post({ id: 2 }),
        ];
        const getPostsService = givenPostService(response);
        const postsByTagIdService = givenPostsByTagIdService([]);

        await getPostsController(app(), getPostsService(), postsByTagIdService())
        await expect(spySend).toBeCalledWith(response)
    });

    it('all ok when req query have tag', async () => {
        const { spySend, app } = givenApp({
            query: { tag: 1 }
        });
        const getPostsService = givenPostService([]);
        const response = [
            Post({ id: 1 }),
            Post({ id: 3 }),
        ];
        const postsByTagIdService = givenPostsByTagIdService(response);

        await getPostsController(app(), getPostsService(), postsByTagIdService())
        await expect(spySend).toBeCalledWith(response)
    });


});
