import React from 'react';
import BackgroundImg from '../commons/images/download_3.jpg';
import { Container, Jumbotron } from 'reactstrap';
import "./styles/home.css";
import WeatherContainer from "../weather_forecast/weather-container";
import Local from "../local_data/local";
import EmployeeData from "../wearable_data/employee-data";


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

const Home = ({spikes, employee}) => {
    return (
        <div>
            <Jumbotron fluid style={backgroundStyle}>
                <Container fluid>
                    <h1 className="display-3" style={textStyle}>PulseLink</h1>
                    <p className="lead" style={textStyle}><b>Shaping the future of your team's well-being.</b></p>
                </Container>
                <div>
                    <WeatherContainer/>
                </div>
                <div className="cards-container">
                    <Local />
                    <EmployeeData spikes={spikes} employee={employee}/>
                </div>
            </Jumbotron>
        </div>
    );
};

export default Home;
