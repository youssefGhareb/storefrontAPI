ALTER TABLE orders 
ADD CONSTRAINT orders_fk 
FOREIGN KEY (user_id) 
REFERENCES users (id);