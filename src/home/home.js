import React from 'react';
import BackgroundImg from '../commons/images/ddddd.jpg';
import { Container, Jumbotron } from 'reactstrap';
import "./styles/home.css";
import WeatherContainer from "../weather_forecast/weather-container";
import Local from "../local_data/local";
import { Button } from 'reactstrap';  {/* Adăugăm Button aici */}

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    width: "100%",
    height: "1200px",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundColor: "0A7075"
};

const textStyle = { color: 'white' };

const Home = ({parsedData}) => {
    console.log(parsedData);  // Afișează valorile în consola browserului

    return (
        <div style={backgroundStyle}>
            <Jumbotron style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Container>
                    <h1 style={{ ...textStyle, fontSize: '36px' }}>Welcome to Our Smart Glove</h1>
                    <p style={{ ...textStyle, fontSize: '24px' }}>Monitor your hand rehabilitation progress and take one step closer to recovery with the help of your smart glove.</p>
                </Container>
            </Jumbotron>
  
            {/* Secțiunea pentru butoane */}
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '700px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',  // Distribuim butoanele uniform
                    width: '70%',  // Ajustăm lățimea pentru a distribui mai bine
                    position: 'relative',
                    alignItems: 'center',
                }}>
                    {/* Butonul 1 */}
                    <Button style={{
                        margin: '10px',
                        borderRadius: '15px',
                        width: '150px',
                        height: '70px',
                        fontSize: '20px',
                    }} color="primary">
                        Sensor 1: {parsedData.S1}
                    </Button>

                    {/* Butonul 2 */}
                    <Button style={{
                        margin: '10px',
                        borderRadius: '15px',
                        width: '150px',
                        height: '70px',
                        fontSize: '20px',
                    }} color="primary">
                        Sensor 2: {parsedData.S2}
                    </Button>

                    {/* Butonul 3 (centrat) */}
                    <Button style={{
                        margin: '10px',
                        borderRadius: '15px',
                        width: '150px',
                        height: '70px',
                        fontSize: '20px',
                    }} color="primary">
                        Sensor 3: {parsedData.S3}
                    </Button>

                    {/* Butonul 4 */}
                    <Button style={{
                        margin: '10px',
                        borderRadius: '15px',
                        width: '150px',
                        height: '70px',
                        fontSize: '20px',
                    }} color="primary">
                        Sensor 4: {parsedData.S4}
                    </Button>

                    {/* Butonul 5 */}
                    <Button style={{
                        margin: '10px',
                        borderRadius: '15px',
                        width: '150px',
                        height: '70px',
                        fontSize: '20px',
                    }} color="primary">
                        Sensor 5: {parsedData.S5}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Home;
