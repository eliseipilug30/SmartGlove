import React from 'react';

import * as API_AUTH from "../api/login-api";
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import validate from "./validators/login-validators";
import APIResponseErrorMessage from '../../commons/errorhandling/api-response-error-message';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    },
                },
                password: {
                    value: '',
                    placeholder: 'Password',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                    },
                },
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid,
        });
    }

    handleSubmit() {
        const credentials = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        };

        API_AUTH.login(credentials, (result, status, error) => {
            console.log("Here!!!");

            if (status < 300) {
                this.props.onLoginSuccess(result);
            } else {
                this.setState({
                    errorStatus: status,
                    error: error || "An unknown error occurred.",
                });
            }
        });
    }

    render() {
        return (
            <div>
                <FormGroup id="username">
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Label for="usernameField">Username:</Label>
                            <Input
                                name="username"
                                id="usernameField"
                                placeholder={this.state.formControls.username.placeholder}
                                onChange={this.handleChange}
                                value={this.state.formControls.username.value}
                                touched={this.state.formControls.username.touched ? 1 : 0}
                                required
                            />
                            {this.state.formControls.username === "" && (
                                <div className="error-message">* Username field is mandatory!</div>
                            )}
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup id="password">
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Label for="passwordField">Password:</Label>
                            <Input
                                type="password"
                                name="password"
                                id="passwordField"
                                placeholder={this.state.formControls.password.placeholder}
                                onChange={this.handleChange}
                                value={this.state.formControls.password.value}
                                touched={this.state.formControls.password.touched ? 1 : 0}
                                required
                            />
                            {this.state.formControls.password=== "" && (
                                <div className="error-message">* Password field is mandatory!</div>
                            )}
                        </Col>
                    </Row>
                </FormGroup>


                <Row>
                    <Col sm={{ size: '4', offset: 8 }}>
                        <Button color="info" disabled={!this.state.formIsValid} onClick={this.handleSubmit}>
                            Sign in
                        </Button>
                    </Col>
                </Row>

                {this.state.errorStatus > 0 && <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />}
            </div>
        );
    }
}

export default LoginForm;
