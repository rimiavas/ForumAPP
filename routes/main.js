module.exports = function(app, forumData) {
    // Home page - List latest posts
    app.get('/', function(req, res) {
        // Add your logic to retrieve and display the latest posts
        res.render('home.ejs', forumData);
    });

    // Topics page - List all topics
    app.get('/topics', function(req, res) {
        // Add your logic to retrieve and display all topics
        let sql = 'SELECT * FROM topics';
        db.query(sql, function(err, result) {
            if (err) throw err;
            let topicsData = Object.assign({}, forumData ,{allTopics: result});
            res.render('topics.ejs', topicsData);
        })
    });

    // Users page - List all users
    app.get('/users', function(req, res) {
        // Add your logic to retrieve and display all users
        let sql = 'SELECT * FROM users';
        db.query(sql, function(err, result) {
            if (err) throw err;
            let usersData = Object.assign({}, forumData ,{allUsers: result});
            res.render('users.ejs', usersData);
        })
    });

    // Posts page - List all posts
    app.get('/posts', function(req, res) {
        // Add your logic to retrieve and display all posts
        let sql = 'SELECT posts.title, posts.content, users.name AS creator, topics.name AS topic ' + 
        'FROM posts ' + 
        'INNER JOIN users ON posts.user_id = users.id ' + 
        'INNER JOIN topics ON posts.topic_id = topics.id';
;
        db.query(sql, function(err, result) {
            if (err) throw err;
            let postsData = Object.assign({}, forumData ,{allPosts: result});
            res.render('posts.ejs', postsData);
        })
    });

    // Add post page - Form to create new post
    app.get('/addpost', function(req, res) {
        // Add your logic to retrieve data for dropdown lists
        let sqlUsers = 'SELECT * FROM users';
        let sqlTopics = 'SELECT * FROM topics';

        // Execute queries to get users and topics data
        db.query(sqlUsers, function(errUsers, resultUsers) {
            if (errUsers) throw errUsers;

            db.query(sqlTopics, function(errTopics, resultTopics) {
                if (errTopics) throw errTopics;

                // Combine the data and render the form
                let addPostData = Object.assign({}, forumData ,{allUsers: resultUsers}, {allTopics: resultTopics});

                res.render('addPost.ejs', addPostData);
            });
        });
    });

    // Handle the form submission (POST request) to create a new post
    app.post('/addpost', function(req, res) {
        // Extract data from the form submission
        const { title, content, userId, topicId } = req.body;

        // Add your logic to insert the new post into the database
        let sql = 'INSERT INTO posts (title, content, user_id, topic_id) VALUES (?, ?, ?, ?)';

        // Execute the SQL query to insert the new post
        db.query(sql, [title, content, userId, topicId], function(err, result) {
            if (err) throw err;

           // Redirect to the posts page or show a confirmation message
            res.redirect('/posts');
        });
    });



    // Search page - Search posts on title/content
    app.get('/search', function(req, res) {
        // Add your logic to handle the search page
        res.render('search.ejs', forumData);
    });

    app.get ('/search-results', function (req, res) {
        let keyword = req.query.keyword;
        let sql = "SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?";
        let searchTerm = '%' + keyword + '%';
    
        db.query(sql, [searchTerm, searchTerm], (err, result) => {
            if (err) throw err;
            let searchData = Object.assign({}, forumData, { searchTerm : keyword }, { posts: result });
            res.render("search-results.ejs", searchData);
        });
    });
    

    // About page - Info about the app
    app.get('/about', function(req, res) {
        // Add your logic to provide information about the app
        res.render('about.ejs', forumData);
    });

    // User profile page - Details and posts for user
    app.get('/profile/:userId', function(req, res) {
        // Add your logic to retrieve and display user profile and posts
        let userId = req.params.userId;
        // Render user profile and posts based on the userId
        res.render('profile.ejs', { ...forumData, userId: userId });
    });

    // Topic page - Details and posts for topic
    app.get('/topic/:topicId', function(req, res) {
        // Add your logic to retrieve and display topic details and posts
        let topicId = req.params.topicId;
        // Render topic details and posts based on the topicId
        res.render('topic.ejs', { ...forumData, topicId: topicId });
    });

    // Add more routes as per your requirements
};