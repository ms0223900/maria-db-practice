const Post = ({ id, title = '', description = '', content = '' }) => ({
    id,
    title,
    description,
    content,
})

const AddPostDbDto = ({ title, description = '', content = '' }) => ({
    title,
    description,
    content,
})
module.exports = { Post, AddPostDbDto }