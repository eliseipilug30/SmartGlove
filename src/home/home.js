import React from 'react';

import BackgroundImg from '../commons/images/download_1.jpg';

import {Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1200px",
    backgroundImage: `url(${BackgroundImg})`
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
                <div className="homepage-container">
                    <div className="card left-card">
                        <h2>Fancy Text 1</h2>
                        <p>This is some fancy text for the left card.</p>
                    </div>
                    <div className="card right-card">
                        <h2>Fancy Text 2</h2>
                        <p>This is some fancy text for the right card.</p>
                    </div>
                </div>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
