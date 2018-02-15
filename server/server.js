global.__base = __dirname+"/../";
const env = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const router = require('./routers/_index');
const attachSockets = require('./sockets/_index');

env.config({path: __base+"config/.env"});
env.load();

app.use(morgan("common")); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true  })); 

app.use('/', router);
attachSockets(io);

server.listen(process.env.PORT, function () {
	  console.log(`Listening on port ${process.env.PORT}!`);
});
