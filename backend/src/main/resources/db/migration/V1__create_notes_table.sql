CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    text TEXT,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP
)