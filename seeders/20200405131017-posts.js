'use strict';

var request = require('request');
var path = require('path');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return new Promise((resolve, reject) => {
            var url = "https://jobs.github.com/positions.json?page=1";
            request.get(url, function(err, rows) {
                queryInterface.bulkInsert('posts', JSON.parse(rows.body));
                resolve('Done');
            })
        });
    },

    down: (queryInterface, Sequelize) => {}
};