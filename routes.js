var fs = require('fs'),
    path = require('path'),
	debug = require('debug')('layout-watch'),
    watchPath = require('./config').watchPath;

module.exports = function (app) {
    app.all('*.html*', routeHandler);
    app.all('/', routeHandler);
};

function routeHandler(req, res) {
    var url = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '').replace(/\?.*$/, ''),
		layoutPath = path.resolve(__dirname, watchPath, 'layout.html'),
		filePath = path.resolve(__dirname, watchPath, url);
	
	debug(url);
    debug('Layout at: ' + layoutPath);
    fs.readFile(layoutPath, function (err, layout) {
		if (err) return console.log(err);
		debug('Requested file at: ' + filePath);
        fs.readFile(filePath, function (err, main) {
			if (err) return console.log(err);
            var layoutParts = layout.toString().split('===');
            res.send(layoutParts[0] + main.toString() + layoutParts[1]);
        });
    });
}