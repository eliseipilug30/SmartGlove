import React from 'react';

import BackgroundImg from '../commons/images/download_3.jpg';

import {Container, Jumbotron} from 'reactstrap';
import "./styles/home.css"

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1200px",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundColor: "0A7075"
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                <Container fluid>
                    <h1 className="display-3" style={textStyle}>Harmoniq</h1>
                    <p className="lead" style={textStyle}> <b>Shaping the future of your team's well-being.</b>
                    </p>
                </Container>
                <div className="cards-container">
                    <div className="card">
                        <h2>Ambiental data</h2>
                        <div className="ambient">
                            <p>Outside temperature:</p>
                            <p>Outside humidity:</p>
                            <p>Smoke level:</p>
                            <p>Gas level:</p>
                            <p>UV level:</p>
                            <p>Extreme weather warnings:</p>
                            <p>Quality of air in the area:</p>
                        </div>
                    </div>
                    <div className="card">
                        <h2>Employee data</h2>
                        <div className="employee">
                            <p>Some graph to view an average of the employee's data</p>
                        </div>
                    </div>
                </div>
                </Jumbotron>
            </div>
        )
    };
}

export default Home
