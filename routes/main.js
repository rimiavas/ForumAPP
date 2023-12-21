module.exports = function(app, forumData) {
    // Home page - List latest posts
    app.get('/', function(req, res) {
        // Add your logic to retrieve and display the latest posts
        let sql = 'SELECT posts.id, posts.title, posts.content, posts.created_at, users.name AS creator, topics.name AS topic ' + 
        'FROM posts ' + 
        'INNER JOIN users ON posts.user_id = users.id ' + 
        'INNER JOIN topics ON posts.topic_id = topics.id ' +
        'ORDER BY created_at DESC LIMIT 15';    
        
        db.query(sql, function(err, result) {
            if (err) throw err;
            let homeData = Object.assign({}, forumData, {latestPosts: result});
            res.render('home.ejs', homeData);
        });
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

    app.get('/postdeleted', function(req, res) {
        res.render('postdeleted.ejs' ,forumData);
    });

    // Posts page - List all posts
    app.get('/posts', function(req, res) {
        // Add your logic to retrieve and display all posts
        let sql = 'SELECT posts.id, posts.title, posts.content, posts.created_at, users.name AS creator, topics.name AS topic ' + 
        'FROM posts ' + 
        'INNER JOIN users ON posts.user_id = users.id ' + 
        'INNER JOIN topics ON posts.topic_id = topics.id';
        db.query(sql, function(err, result) {
            if (err) throw err;
            let postsData = Object.assign({}, forumData ,{allPosts: result});
            res.render('posts.ejs', postsData);
        })
    });

    // Handle the request to delete a post
    app.post('/delete-post', function(req, res) {
        const postIdToDelete = req.body.postId; // Assuming the post ID is sent in the request body

        // Add your logic to delete the post from the database
        let sql= 'DELETE FROM posts WHERE id = ?';
        db.query(sql, [postIdToDelete], function(err, result) {
            if (err) {
                throw err;
            } else {
                // Post deleted successfully
                // Redirect to completion after successful post deletion.
                res.redirect('postdeleted');
            }
        });
    });

    
    app.get('/notamember', function(req, res) {
        res.render('notamember.ejs' ,forumData);
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

    //handle the form submission (post request) to create a new post, check if user member of topic before post
    app.post('/addpost', function(req, res) {

        const {userId, topicId} = req.body;
        // Add your logic to create a new post
        let sql = 'SELECT * FROM user_topics WHERE user_id = ? AND topic_id = ?';
        db.query(sql, [userId, topicId], function(err, result) {
            if (err) {
                throw err
            } else if (result.length > 0) {
                // Extract data from the form submission
                const { title, content, created_at, userId, topicId } = req.body;
                // Add your logic to create a new post
                let sql = 'INSERT INTO posts (title, content, created_at, user_id, topic_id) VALUES (?, ?, ?, ?, ?)';
                db.query(sql, [title, content, created_at, userId, topicId], function(err, result) {
                    if (err) {
                        throw err
                    } else {
                        // Redirect to the home page after successful post creation
                        res.redirect('/');
                    }
                });
            } else {
                // The user is not a member of the topic, prevent post creation
                res.redirect('notamember');
            }
        });
    });


    // Search page - Search posts on title/content
    app.get('/search', function(req, res) {
        // Add your logic to handle the search page
        res.render('search.ejs', forumData);
    });

    app.get ('/search-results', function (req, res) {
        let keyword = req.query.keyword;
        let sql = 'SELECT posts.title, posts.content, posts.created_at, users.name AS creator, topics.name AS topic ' + 
        'FROM posts ' + 
        'INNER JOIN users ON posts.user_id = users.id ' + 
        'INNER JOIN topics ON posts.topic_id = topics.id ' +
        'WHERE posts.title LIKE ? OR posts.content LIKE ? OR users.name LIKE ? OR topics.name LIKE ?';
        let searchTerm = '%' + keyword + '%';
    
        db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, result) => {
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

};