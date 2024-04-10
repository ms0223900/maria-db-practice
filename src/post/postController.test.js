const getPostsController = require("./postController");
const { Post } = require("./Post");

jest.useFakeTimers();
describe('post controller', function () {
    it('all ok', async () => {
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
        const getPostsService = jest.fn();
        getPostsService.mockReturnValue({
            execute() {
                return Promise.resolve([
                    Post({
                        id: 0,
                    })
                ]);
            }
        })
        const getPostsByTagIdService = jest.fn();
        getPostsByTagIdService.mockReturnValue({
            execute() {
                return [
                    Post({
                        id: 0,
                    }),
                    Post({
                        id: 1,
                    })
                ];
            }
        })

        await getPostsController(app(), getPostsService())
        await expect(spySend).toHaveBeenCalled()

    });
});
