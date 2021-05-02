CREATE DATABASE friskdevtest;
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    post_name VARCHAR(255),
    post_email VARCHAR(255),
    post_pin SMALLINT,
    post_message VARCHAR(255),
    post_creation TIMESTAMP DEFAULT current_timestamp
);