import { BehaviorSubject } from 'rxjs';
// import config from 'config';

import { handleResponse } from '../../helper';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    refreshToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`https://localhost:44352/api/User/Authenticate`, requestOptions)
        .then(handleResponse)
        .then(result => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (result.data) {
                localStorage.setItem('currentUser', JSON.stringify(result.data));
                // startRefreshTokenTimer();
                currentUserSubject.next(result.data);
    
                return result.data;
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // stopRefreshTokenTimer();
    currentUserSubject.next(null);
}

function refreshToken() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ` + currentUserSubject.value.refreshToken },
    };
    return fetch(`https://localhost:44352/api/User/refresh-token`, requestOptions)
    .then(handleResponse)
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            if(user.status === 'success') {
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                currentUserSubject.next(user.data);
                // startRefreshTokenTimer();
                return user.data;
            } else {
                // stopRefreshTokenTimer();
            }
        });
}

// let refreshTokenTimeout;
// function startRefreshTokenTimer() {
//     if (currentUserSubject.value) {
//             // parse json object from base64 encoded jwt token
//     const token = JSON.parse(atob(currentUserSubject.value.token.split('.')[1]));

//     // set a timeout to refresh the token a minute before it expires
//     const expires = new Date(token.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - (60 * 1000);
//     refreshTokenTimeout = setTimeout(refreshToken, timeout);
//     }
// }

// function stopRefreshTokenTimer() {
//     clearTimeout(refreshTokenTimeout);
// }