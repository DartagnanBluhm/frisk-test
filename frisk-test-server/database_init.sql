CREATE DATABASE friskdevtest;
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    post_name VARCHAR(50),
    post_email VARCHAR(50),
    post_pin SMALLINT,
    post_message VARCHAR(50),
    post_creation TIMESTAMP DEFAULT current_timestamp
);