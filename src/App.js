import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './navigation-bar';
import Home from './home/home';
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            error: "",
            device: null,
            parsedData: { S1: 567, S2: 585, S3: 696, S4: 564, S5: 562 },
            spikes: [],
            employee: null,
        };

        this.connectToHM10 = this.connectToHM10.bind(this);
        this.disconnectFromHM10 = this.disconnectFromHM10.bind(this);
    }

    // UUIDs for HM-10 (common values)
    serviceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
    characteristicUUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

    // Function to request a connection to the HM-10 BLE device
    connectToHM10 = async () => {
        try {
            // Request the Bluetooth device
            const selectedDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [this.serviceUUID], // HM-10 service UUID
            });

            // Store the device in state
            this.setState({ device: selectedDevice });

            // Connect to the GATT server
            const server = await selectedDevice.gatt.connect();

            // Get the HM-10 service
            const service = await server.getPrimaryService(this.serviceUUID);

            // Get the characteristic for reading data
            const characteristic = await service.getCharacteristic(this.characteristicUUID);

            // Start listening for notifications (data updates)
            await characteristic.startNotifications();
            characteristic.addEventListener("characteristicvaluechanged", (event) => {
                const value = new TextDecoder().decode(event.target.value);
                this.setState((prevState) => {
                    const newParsedData = {};
                    value.split('\n').forEach(line => {
                        const [key, val] = line.split(':').map(item => item.trim());
                        if (key && val) {
                            newParsedData[key] = Number(val);
                        }
                    });

                    return {
                        data: value,
                        parsedData: {
                            ...prevState.parsedData,
                            ...newParsedData, // Merge new values into the existing state
                        }
                    };
                });

                console.log(value);
            });

            console.log("Connected to HM-10!");
        } catch (err) {
            this.setState({ error: `Error: ${err.message}` });
            console.error("Bluetooth error:", err);
        }
    };

    // Function to disconnect from the HM-10 BLE device
    disconnectFromHM10 = () => {
        const { device } = this.state;
        if (device && device.gatt.connected) {
            device.gatt.disconnect();
            this.setState({ device: null, data: "" });
            console.log("Disconnected from HM-10!");
        }
    };

    render() {
        return (
            <div className={styles.back}>
                <Router>
                    <div>
                        <NavigationBar connectToHM10={this.connectToHM10} disconnectFromHM10={this.disconnectFromHM10} />
                        <Switch>
                            <Route exact path='/' render={() => <Home parsedData={this.state.parsedData} />} />
                            <Route exact path='/error' render={() => <ErrorPage />} />
                            <Route render={() => <ErrorPage />} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
