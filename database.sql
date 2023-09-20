CREATE DATABASE blog_api;
\c blog_api

CREATE TYPE user_role AS ENUM ('admin','user');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL,
  CHECK (char_length(name)>=3 and char_length(name)<=50),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  Check (char_length(password)>=6),
  role user_role NOT NULL DEFAULT 'user'
);

CREATE TABLE articles(
  article_id SERIAL PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
user_id INT REFERENCES users(user_id),
created_at timestamp with time zone not null default now()
);

CREATE TABLE favoris(
  article_id INT ,
  user_id INT ,
  FOREIGN KEY (article_id)  REFERENCES  articles(article_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES  users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (article_id,user_id)
);