const sqlite3 = require('sqlite3')
var request = require('request');

let db = new sqlite3.Database("./jobPosts.sqlite3", (err) => {
    if (err) {
        console.log('Error when creating the database', err)
    } else {
        console.log('Database created!')
        /* Put code to create table(s) here */
        createTable()
    }
})


const createTable = () => {
    console.log("create database table posts");
    db.run("CREATE TABLE IF NOT EXISTS posts(id STRING PRIMARY KEY, company TEXT, company_logo TEXT, company_url TEXT, created_at DATE, description TEXT, how_to_apply TEXT, location TEXT, title TEXT, type TEXT, url TEXT)", insertData);
}

const insertData = () => {
    console.log("Insert data")
    request.get("https://jobs.github.com/positions.json", function (err, rows) {
        console.log("response data", JSON.parse(rows.body)[0].company);
        var responseData = JSON.parse(rows.body);
        responseData.forEach(function (row) {
            console.log(row.id + ": " + row.company);
            db.run('INSERT INTO posts (id, company, company_logo, company_url, created_at, description,how_to_apply, location, title, type, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [row.id, row.company, row.company_logo, row.company_url, row.created_at, row.description,row.how_to_apply, row.location, row.title, row.type, row.url]);
        });
        // res.send(rows)
    });

}

read = () => {
    console.log("Read data from contacts");
    db.all("SELECT rowid AS id, name FROM contacts", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.name);
        });
    });
}

// read();

// db.close();
