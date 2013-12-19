var current = process.env.NODE_ENV || 'development',
	env = require('./environments/' + current);

module.exports = env;