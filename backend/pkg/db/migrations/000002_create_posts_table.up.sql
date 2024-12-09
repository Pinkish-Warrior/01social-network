CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    group_id INTEGER REFERENCES groups(id) DEFAULT NULL, 
    content TEXT NOT NULL,
    image TEXT,
    privacy TEXT CHECK(privacy IN ('public', 'private', 'almost_private')) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);