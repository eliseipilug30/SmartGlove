import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './navigation-bar';
import Home from './home/home';
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import LoginContainer from "./login/login-container";
import { USERS_HOST } from './commons/hosts';
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
            currentRole: "",
            selectedDate: "",
            selectedDeviceId: "",
            cookie: localStorage.getItem("cookie") || "",
        };

        this.afterLogin = this.afterLogin.bind(this);
        this.afterLogout = this.afterLogout.bind(this);
        this.fetchRoleIfLoggedIn = this.fetchRoleIfLoggedIn.bind(this);
        this.setSelection = this.setSelection.bind(this);
    }

    setSelection(date, deviceId) {
        console.log(date);
        console.log(deviceId);

        this.setState({
            selectedDate: date,
            selectedDeviceId: deviceId,
        });
    }

    afterLogin(cookie) {
        this.setState(
            {
                isLoggedIn: true,
                cookie: cookie,
            },
            () => {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("cookie", cookie);
            }
        );

        this.fetchRoleIfLoggedIn();
    }

    afterLogout() {
        axios.post(USERS_HOST.backend_api + '/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                document.cookie = 'SESSION_ID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                console.log('Cookie cleared');
            })
            .catch(error => console.error("There was an error logging out:", error));

        this.setState(
            {
                isLoggedIn: false,
                cookie: "",
            },
            () => {
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("cookie", "");
            }
        );
    }

    componentDidMount() {
        window.addEventListener("storage", this.syncStateWithStorage);
        this.fetchRoleIfLoggedIn();
    }

    componentWillUnmount() {
        window.removeEventListener("storage", this.syncStateWithStorage);
    }

    fetchRoleIfLoggedIn() {

    }

    syncStateWithStorage = () => {
        this.setState({
            isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
            cookie: localStorage.getItem("cookie") || "",
        });
    };

    render() {
        return (
            <div className={styles.back}>
                <Router>
                    <div>
                        <NavigationBar isLoggedIn={this.state.isLoggedIn} currentRole={this.state.currentRole} logout={this.afterLogout} />
                        <Switch>
                            <Route exact path='/' render={() => <Home />} />

                            <Route exact path='/login' render={() => <LoginContainer isLoggedIn={this.state.isLoggedIn} afterLogin={this.afterLogin} />} />

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
