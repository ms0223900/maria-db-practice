CREATE TABLE postTags (
    postId INT,
    tag INT,
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (tag) REFERENCES tags(id)
);
