import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { generateIotEvent } from './iotevent';
import cors from 'cors'; // Import cors

const app = express();

app.use(cors()); // Use cors as middleware

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"] // Allow these HTTP methods
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    const intervalId = setInterval(() => {
        const event = generateIotEvent();
        socket.emit('iotEvent', event);
    }, 500);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        clearInterval(intervalId);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});