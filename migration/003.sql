CREATE TABLE postTags (
    postId INT,
    tag INT,
    FOREIGN KEY (postId) REFERENCES tags(id)
);
