const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var request = require('request');

var path = require('path');
var cors = require('cors');
var models = require('./models');
var async = require('async');

var Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});

var op = sequelize.Op;

models.sequelize
    .authenticate()
    .then(function() {
        console.log('DB Connection connected');
    })
    .catch(function(err) {
        if (err) {
            log.error({ err: err });
        }
    });

models.sequelize.sync().then(function() {
    app.listen(3000, () => {
        console.log("Server started (http://localhost:3000/) !");
    });
});

var corsOptions = {
    origin: ['http://192.168.43.95:4200'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// To get all the job details
app.get("/jobs", (req, res) => {
    console.log(req.query)
    models.post.findAll({
        // order: ['created_at'],
        // limit: 5,
        // offset: 0,
    }).then(function(posts) {
        res.send({
            posts: posts,
            count: posts.length
        })
    }).catch(function(error) {
        res.send(error)
    })
});


// To get job based on specific id
app.get("/getjobDetails/:id", (req, res) => {
    models.post.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(posts) {
        res.send(posts)
    }).catch(function(error) {
        console.log(error)
        res.send(error)
    })
});

// To get jon based on search
app.get("/getJobsbySearch", (req, res) => {
    console.log('req.query')
    console.log(req.query)
    models.post.findAll({
        where: {
            description: {
                [Sequelize.Op.like]: '%' + req.query.search + '%'
            },
            location: {
                [Sequelize.Op.like]: '%' + req.query.location + '%'
            }
        }
    }).then(function(posts) {
        res.send({ posts: posts, count: posts.length })
    }).catch(function(error) {
        console.log(error)
        res.send(error)
    })

});

// sync the job-posts
app.get("/jobSync", (req, res) => {
    data = [1, 2, 3, 4];
    async.each(data, function(i, callback) {
        var url = "https://jobs.github.com/positions.json?page=" + i;
        request.get(url, function(err, rows) {
            models.post.bulkCreate(JSON.parse(rows.body)).then(function(posts) {
                callback();
            }).catch(function(error) {
                callback();
            })
        })
    }, function(err) {
        if (!err) {
            models.post.findAll({
                // order: ['created_at'],
                // limit: 5,
                // offset: 0,
            }).then(function(posts) {
                res.send({
                    posts: posts,
                    count: posts.length,
                    message: 'Jobs Synced Successfully'
                })
            }).catch(function(error) {
                res.send(error)
            })
        } else {
            res.json(errorData);
        }
    });
});