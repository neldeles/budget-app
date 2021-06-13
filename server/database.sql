CREATE DATABASE budgetapp;

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- insert test user
INSERT INTO users(name, email, password) VALUES ('test user', 'testuser@email.com', 'test123');

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    user_id UUID,
    category_group_id SERIAL,
    name VARCHAR(255) NOT NULL,
    budgeted_amount NUMERIC DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_group_id) REFERENCES category_groups (id)
);

-- insert test category
INSERT INTO categories(user_id, category_group_id, name) VALUES ('1fc41baf-55a1-4786-a2e7-6afaa221c43c', 1, 'Electricity');
INSERT INTO categories(user_id, category_group_id, name) VALUES ('e782a859-7343-4c5b-a95d-df4f564ddbff', 1, 'Food');

select c.id as category_id, c.name as category, budgeted_amount, cg.name as category_group from categories as c left join category_groups as cg on c.category_group_id = cg.id;

CREATE TABLE category_groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- insert test category group
INSERT INTO category_groups(name) VALUES ('Immediate Obligations');