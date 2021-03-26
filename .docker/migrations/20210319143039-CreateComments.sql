
-- +migrate Up
CREATE TABLE IF NOT EXISTS comments (
    id         INTEGER      NOT NULL AUTO_INCREMENT,
    post_id    INTEGER      NOT NULL,
    user_id    VARCHAR(128) NOT NULL,
    type       ENUM('highlight', 'commit', 'none') DEFAULT('none') NOT NULL,
    content    TEXT,
    first_line INTEGER,
    last_line  INTEGER,
    code       TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id, post_id),
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
-- +migrate Down
DROP TABLE IF EXISTS comments;
