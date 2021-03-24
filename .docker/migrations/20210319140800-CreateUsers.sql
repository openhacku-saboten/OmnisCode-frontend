
-- +migrate Up
CREATE TABLE IF NOT EXISTS users (
    id         VARCHAR(128) PRIMARY KEY,
    name       VARCHAR(128) NOT NULL,
    twitter_id VARCHAR(15),
    profile    TEXT,
    UNIQUE KEY (twitter_id)
);
-- +migrate Down
DROP TABLE IF EXISTS users;
