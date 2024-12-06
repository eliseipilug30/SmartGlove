import { USERS_HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    signin: 'signin'
};

function login(user, callback) {
    console.log(user.username)
    console.log(user.password)

    let request = new Request(USERS_HOST.backend_api + endpoint.signin, {
        method: 'POST',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
             username: user.username,
             password: user.password
        })
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    login
};
