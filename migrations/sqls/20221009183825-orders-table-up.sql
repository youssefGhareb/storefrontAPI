CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id INTEGER,
    status VARCHAR(10)
);