const getPostsController = require("./postController");
const { Post } = require("./Post");

jest.useFakeTimers();
describe('post controller', function () {
    function givenApp() {
        let req = {};
        const spySend = jest.fn();
        const res = {
            send: spySend,
        };
        const app = jest.fn();
        app.mockReturnValue({
            async get(_, cb) {
                console.log("_: ", _);
                console.log("cb: ", cb);
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

    it('all ok', async () => {
        const { spySend, app } = givenApp();
        const getPostsService = givenPostService();
        const postsByTagIdService = givenPostsByTagIdService();

        await getPostsController(app(), getPostsService())
        await expect(spySend).toHaveBeenCalled()

    });
});
