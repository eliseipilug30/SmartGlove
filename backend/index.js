const express = require('express')
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');
const { insertReading } = require("./get-db-data");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    'https://polihack.netlify.app',
    'http://localhost:3000', // Add other origins here
];

// Dynamic CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the origin
        } else {
            callback(new Error('Not allowed by CORS')); // Block the origin
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // If using cookies or credentials
};

// Apply the CORS middleware
app.use(cors(corsOptions));
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,        // Allow requests from this origin
        methods: ['GET', 'POST'],       // Specify allowed HTTP methods
    },
});

// Use CORS middleware
app.use(cors());
const appPort = 3001;

const PORT = 3002; // Node server port
const SERIAL_PORT = 'COM12'; // Change to your Arduino's serial port
const BAUD_RATE = 9600; // Match the baud rate of your Arduino

// Setup SerialPort
const serialPort = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

app.get('/', (req, res) => {
    res.status(200).send('Backend up and running!');
})

app.listen(appPort, () => {
    console.log(`App running on port ${appPort}.`)
})

// Serial data event listener
parser.on('data', (data) => {
    console.log('Received data from Arduino:', data);
    io.emit('serial-data', data); // Send data to connected clients
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/local', async (req, res) => {
    const { temp, humidity, fire, light, co2 } = req.body;

    if (!temp || !humidity || !fire || !light || !co2) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const newReading = await insertReading(temp, humidity, fire, light, co2);
        res.status(201).json(newReading);  // Send the inserted data as the response
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

