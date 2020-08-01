export const authService = {
    login,
    logout,
    emailRecover,
    recover,
    register
}

function login(url, data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(ticket => {
            localStorage.setItem('ticket', JSON.stringify(ticket))
            return ticket;
        });
}

function logout() {
    localStorage.removeItem('ticket');
}

function emailRecover(url, data) {
    logout();
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions)
        .then(handleResponse);
}

function recover(url, data) {
    logout();
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(`${url}/reset`, requestOptions)
        .then(handleResponse);
}

function register(url, data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(ticket => {
            localStorage.setItem('ticket', JSON.stringify(ticket))
            return ticket;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            //const error = (data && data.message) || response.statusText;
            return Promise.reject(data);
        }

        return data;
    });
}