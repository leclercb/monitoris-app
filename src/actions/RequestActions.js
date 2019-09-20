import axios from 'axios';

export function sendRequest(config) {
    return axios(config);
}