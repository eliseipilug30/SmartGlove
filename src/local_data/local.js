import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";

const Local = () => {
    const [data, setData] = useState('');
    const [parsedData, setParsedData] = useState({ T: 26.20, H: 30.00, F: 16, L: 76, C: 54 });

    useEffect(() => {
        //const socket = io('ws://b07b-5-2-197-133.ngrok-free.app');
        const socket = io('ws://localhost:3002');
        console.log(data);

        socket.on('serial-data', (newData) => {
            console.log('Data from server:', newData);
            setData(newData);

            const newParsedData = {};
            newData.split('\n').forEach(line => {
                const [key, value] = line.split(':').map(item => item.trim());
                if (key && value) {
                    newParsedData[key] = Number(value);
                }
            });

            setParsedData((prevParsedData) => ({
                ...prevParsedData,
                ...newParsedData, // Merge new values into the existing state
            }));

            sendDataToBackend();
        });

        return () => {
            socket.disconnect();
        };
    }, []); // Trigger this effect every time `parsedData` changes


    const sendDataToBackend = async () => {
        const { T, H, F, L, C } = parsedData;

        // Construct the data to be sent to the backend
        const dataToSend = { temp: T, humidity: H, fire: F, light: L, co2: C };

        try {
            // Send a POST request to the backend
            const response = await fetch('http://localhost:3001/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Failed to send data to the backend');
            }

            const result = await response.json();
            console.log('Data inserted into database:', result);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };


    let fireMessage;
    let fireStyle;
    if (parsedData.F > 512) {
        fireMessage = 'Fire warning!!!';
        fireStyle = { color: 'red' };
    }
    else {
        fireMessage = 'No fires.';
        fireStyle = { color: 'green' };
    }

    let lightMessage;
    let lightStyle;
    if (parsedData.L > 512) {
        lightMessage = 'Direct sunlight warning!!!';
        lightStyle = { color: 'red' };
    }
    else if (parsedData.L >= 400 && parsedData.L <= 600) {
        lightMessage = 'Normal sun exposure.';
        lightStyle = { color: 'orange' };
    }
    else {
        lightMessage = 'No direct sunlight.';
        lightStyle = { color: 'green' };
    }

    let AQIMessage;
    let AQIStyle;
    if (parsedData.C > 80) {
        AQIMessage = 'Gas leak warning!!!';
        AQIStyle = { color: 'red' };
    }
    else {
        AQIMessage = 'Normal gas levels.';
        AQIStyle = { color: 'green' };
    }

    return (
        <div className="card">
            <h2>Ambiental data</h2>
            <div className="ambient">
                <p>Workplace temperature: {parsedData.T}°C</p>
                <p>Workplace humidity: {parsedData.H}%</p>
                <p>Fire presence: {parsedData.F/1024}%</p>
                <p>Light level: {parsedData.L}</p>
                <p>Air quality index: {parsedData.C}</p>
            </div>

            <p>--------------------------------------------</p>

            <div className="ambient">
                <p style={fireStyle}>{fireMessage}</p>
                <p style={lightStyle}>{lightMessage}</p>
                <p style={AQIStyle}>{AQIMessage}</p>
            </div>
        </div>);
}

export default Local;