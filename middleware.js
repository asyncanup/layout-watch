var path = require('path'),
	livereload = require('livereload'),
    watchPath = require('./config').watchPath;

module.exports = function (app) {
    livereload.createServer().watch(path.resolve(__dirname, watchPath));
};