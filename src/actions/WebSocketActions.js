import { Auth } from 'aws-amplify';
import { getConfig } from 'config/Config';

let webSocket = null;
let listeners = [];

export function connectWebSocket() {
    return async () => {
        if (webSocket) {
            return;
        }

        const url = new URL(getConfig().wsUrl);
        url.searchParams.set('token_type', 'bearer');
        url.searchParams.set('access_token', (await Auth.currentSession()).getAccessToken().getJwtToken());

        webSocket = new WebSocket(url.href);

        webSocket.onmessage = event => {
            listeners.forEach(listener => listener(event));
        };
    };
}

export function closeWebSocket() {
    return async () => {
        if (!webSocket) {
            return;
        }

        webSocket.close();
        webSocket = null;
    };
}

export function addMessageListener(listener) {
    return async () => {
        listeners.push(listener);
        return () => listeners.splice(listeners.indexOf(listener), 1);
    };
}

export function removeMessageListener(listener) {
    return async () => {
        listeners.splice(listeners.indexOf(listener), 1);
    };
}