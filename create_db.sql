-- SHOW DATABASES; --
CREATE DATABASE myForum;
USE myForum; --
-- SHOW TABLES; --
-- DESCRIBE users; --
-- DESCRIBE topics; --
-- DESCRIBE user_topics; --
-- DESCRIBE posts;--


CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE topics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE user_topics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  topic_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (topic_id) REFERENCES topics(id)
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

-- SELECT * FROM users; --
-- SELECT * FROM topics; --
-- SELECT * FROM posts; --
-- SELECT * FROM user_topics; --

FLUSH PRIVILEGES;
SHOW GRANTS FOR 'appuser'@'localhost';
GRANT ALL PRIVILEGES ON myforum.* TO 'appuser'@'localhost';
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';

-- SELECT posts.title, posts.content, users.name AS creator, topics.name AS topic FROM posts INNER JOIN users ON posts.user_id = users.id INNER JOIN topics ON posts.topic_id = topics.id; --

-- ALTER TABLE posts ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;--

-- SELECT user_id, topic_id FROM posts;--



