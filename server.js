/**
 * Created by nghia on 18/03/2015.
 */
var express =   require('express'),
    http =      require('http'),
    server =    http.createServer(app);

var app = express();

const redis =   require('redis');
const io =      require('socket.io');
const client =  redis.createClient();

server.listen(3000, '103.7.40.222');

io.listen(server).on('connection', function(client) {
    const redisClient = redis.createClient()
    redisClient.subscribe('realTime.notification');

    redisClient.on("message", function(channel, message) {
        client.emit(channel, message);
    });

    client.on('disconnect', function() {
        redisClient.quit();
    });
});