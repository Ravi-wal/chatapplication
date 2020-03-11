var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});
var users=[];
io.on('connection', function(socket){
     users[socket.id] = 'Anonymous';
    //console.log(users);
    socket.on('disconnect', function(){
        delete users[socket.id];
        io.emit('users', JSON.stringify(Object.assign({}, users)));
    });
   
    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('typing', function(typingUser){
        socket.broadcast.emit('typing', typingUser);
    });


    socket.on('userName', function(userName){
        users[socket.id] = userName;
        console.log(JSON.stringify(Object.assign({}, users)));
        io.emit('users', JSON.stringify(Object.assign({}, users)));
     });

    console.log(JSON.stringify(Object.assign({}, users)))
    io.emit('users', JSON.stringify(Object.assign({}, users)));
});




http.listen(3006, function(){
  console.log('listening at 3006');
});