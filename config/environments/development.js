var path = require('path'),
    winston = require('winston');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

module.exports = function(parent) {
  parent.use(errorhandler());
	parent.use(serveStatic(path.join(__dirname, './../../src/public')));

	logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)()
	]
});
};
