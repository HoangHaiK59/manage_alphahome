import { BehaviorSubject } from 'rxjs';
// import config from 'config';

import { handleResponse } from '../../helper';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    refreshToken,
    stopRefreshTokenTimer,
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
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            startRefreshTokenTimer();
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    stopRefreshTokenTimer();
    currentUserSubject.next(null);
}

function refreshToken() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`https://localhost:44352/api/User/refresh-token`, requestOptions)
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            if(user.status === 'success') {
                currentUserSubject.next(user.data);
                startRefreshTokenTimer();
                return user;
            } else {
                stopRefreshTokenTimer();
            }
        });
}

let refreshTokenTimeout;
function startRefreshTokenTimer() {
    if (currentUserSubject.value) {
            // parse json object from base64 encoded jwt token
    const token = JSON.parse(atob(currentUserSubject.value.token.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(token.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
    }
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}