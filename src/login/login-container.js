import React from 'react';
import { Card, CardHeader, Row, Col } from 'reactstrap';
import LoginForm from './components/login-form';
import APIResponseErrorMessage from '../commons/errorhandling/api-response-error-message';
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,  // State variable for redirection
            errorStatus: 0,
            error: null,
        };

        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    }

    handleLoginSuccess(result) {
        console.log('Login successful:', result);
        this.props.afterLogin(result.cookie);

        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/profile' />;
        }

        return (
            <div>
                <CardHeader>
                    <strong>Login</strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: '8', offset: 1 }}>
                            <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                        </Col>
                    </Row>
                </Card>

                {/* Error message display */}
                {this.state.errorStatus > 0 && (
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />
                )}
            </div>
        );
    }
}

export default LoginContainer;
