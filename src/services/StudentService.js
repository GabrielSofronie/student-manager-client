export const studentService = {
    getInstitutions
}

function getInstitutions(url) {
    const requestOpts = {
        method: 'GET',
    };

    return fetch(url, requestOpts);
}