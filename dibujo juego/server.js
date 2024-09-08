const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const rooms = {}; // To store the room codes and their status

io.on('connection', (socket) => {
    console.log('A user connected');

    let roomCode;

    function generateRoomCode() {
        return crypto.randomBytes(4).toString('hex').toUpperCase();
    }

    socket.on('createRoom', () => {
        roomCode = generateRoomCode();
        socket.join(roomCode);
        rooms[roomCode] = { sender: true, receiver: false };
        console.log(`New room created: ${roomCode}`);
        socket.emit('roomCode', roomCode); // Emit the room code to the creator
    });

    socket.on('joinRoom', (code) => {
        roomCode = code;
        if (rooms[roomCode]) {
            socket.join(roomCode);
            rooms[roomCode].receiver = true;
            console.log(`User joined room ${roomCode}`);
            io.to(roomCode).emit('roomStatus', rooms[roomCode]); // Notify all clients in the room
        } else {
            socket.emit('error', 'Room code not found');
        }
    });

    socket.on('drawing', (data) => {
        if (roomCode) {
            socket.to(roomCode).emit('drawing', data);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        if (roomCode) {
            if (rooms[roomCode]) {
                if (rooms[roomCode].sender) {
                    delete rooms[roomCode];
                } else {
                    rooms[roomCode].receiver = false;
                }
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
