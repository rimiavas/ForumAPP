-- Populate some users  
INSERT INTO users (name, email, password)
VALUES 
('John', 'john@example.com', 'password1'),
('Sarah', 'sarah@email.com', 'password123'),
('Mike','mike@gmail.com', 'pass456'),
('Jessica','jessica@yahoo.com', 'securepassword');

-- Populate some topics
INSERT INTO topics(name, description) 
VALUES
("JavaScript", "Discussion about JavaScript and frameworks"),
("Python", "General Python chat and questions"), 
("Web Development", "Talk about HTML, CSS, databases and web apps");

-- Create some sample posts linked to users and topics		
INSERT INTO posts(title, content, user_id, topic_id)
VALUES
("JavaScript Performance", "What is faster - for or forEach?", 1, 1), 
("Beginner Python Tips", "What modules should I learn starting out?", 2, 2),
("CSS Issue", "Why doesn't my CSS stylesheet link work?", 3, 3);

INSERT INTO user_topics (user_id, topic_id) 
VALUES 
(3, 2), (1, 1), (2, 2), (3, 3), (4, 3);