import React, { useState } from "react";

const BluetoothReader = () => {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [device, setDevice] = useState(null);

    // UUIDs for HM-10 (common values)
    const serviceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
    const characteristicUUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

    // Function to request a connection to the HM-10 BLE device
    const connectToHM10 = async () => {
        try {
            // Request the Bluetooth device
            const selectedDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [serviceUUID], // HM-10 service UUID
            });

            // Store the device in state
            setDevice(selectedDevice);

            // Connect to the GATT server
            const server = await selectedDevice.gatt.connect();

            // Get the HM-10 service
            const service = await server.getPrimaryService(serviceUUID);

            // Get the characteristic for reading data
            const characteristic = await service.getCharacteristic(characteristicUUID);

            // Start listening for notifications (data updates)
            await characteristic.startNotifications();
            characteristic.addEventListener("characteristicvaluechanged", (event) => {
                const value = new TextDecoder().decode(event.target.value);
                setData(value); // Update state with the received data
                console.log(value);
            });

            console.log("Connected to HM-10!");
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error("Bluetooth error:", err);
        }
    };

    // Function to disconnect from the HM-10 BLE device
    const disconnectFromHM10 = () => {
        if (device && device.gatt.connected) {
            device.gatt.disconnect();
            setDevice(null);
            setData("");
            console.log("Disconnected from HM-10!");
        }
    };

    return (
        <div>
            <h1>HM-10 Bluetooth Reader</h1>
            <button onClick={connectToHM10}>Connect to HM-10</button>
            <button onClick={disconnectFromHM10}>Disconnect</button>
            {data && <p>Data from HM-10: {data}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default BluetoothReader;
