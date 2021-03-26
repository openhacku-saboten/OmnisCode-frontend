
-- +migrate Up
CREATE TABLE IF NOT EXISTS posts (
    id         INTEGER      PRIMARY KEY AUTO_INCREMENT,
    user_id    VARCHAR(128) NOT NULL,
    title      VARCHAR(128) NOT NULL,
    code       TEXT         NOT NULL,
    language   VARCHAR(128) NOT NULL,
    content    TEXT,
    source     VARCHAR(2048),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
-- +migrate Down
DROP TABLE IF EXISTS posts;
