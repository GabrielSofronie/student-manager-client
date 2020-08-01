export const studentService = {
    getInstitutions,
    getDetails
}

function getInstitutions(url) {
    const requestOpts = {
        method: 'GET',
    };

    return fetch(url, requestOpts);
}

function getDetails(url) {
    const ticket = JSON.parse(localStorage.getItem('ticket'));
    const requestOpts = {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${ticket.token}`,
        }
    };

    return fetch(`${url}/${ticket.id}`, requestOpts);
}
