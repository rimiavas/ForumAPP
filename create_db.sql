SHOW DATABASES;
CREATE DATABASE myForum;
USE myForum;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

SHOW TABLES;
describe users;
describe topics;
describe posts;

CREATE TABLE topics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  content TEXT,
  user_id INT,
  topic_id INT,
  FOREIGN KEY(user_id) REFERENCES users(id),  
  FOREIGN KEY(topic_id) REFERENCES topics(id)
);

SELECT * FROM users;
SELECT * FROM topics; 
SELECT * FROM posts;

FLUSH PRIVILEGES;
SHOW GRANTS FOR 'appuser'@'localhost';
GRANT ALL PRIVILEGES ON myforum.* TO 'appuser'@'localhost';
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';

-- SELECT posts.title, posts.content, users.name AS creator, topics.name AS topic FROM posts INNER JOIN users ON posts.user_id = users.id INNER JOIN topics ON posts.topic_id = topics.id; --

ALTER TABLE posts ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;