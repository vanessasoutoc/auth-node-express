'use strict';

const http = require('http');
const app = require('../src/app');

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

app.set('port', port);

server.listen(app.get('port'));
server.on('error', onError);

console.log('API rodando na porta ' + app.get('port'));

function normalizePort(val) {
	const port = parseInt(val, 10);
	if (isNaN(port))
		return val;
	if (port >= 0)
		return port;
	return false;
}

function onError(error) {
	if (error.syscall !== 'listen')
		throw error;
		
	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
		break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
		break;
		default:
			throw error;
	}
}