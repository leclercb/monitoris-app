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

        // eslint-disable-next-line require-atomic-updates
        webSocket = new WebSocket(url.href);

        webSocket.onmessage = event => {
            listeners.forEach(listener => listener(event));
        };
    };
}

export function closeWebSocket() {
    return () => {
        if (!webSocket) {
            return;
        }

        webSocket.close();
        webSocket = null;
    };
}

export function addMessageListener(listener) {
    return () => {
        listeners.push(listener);
        return () => listeners.splice(listeners.indexOf(listener), 1);
    };
}

export function removeMessageListener(listener) {
    return () => {
        listeners.splice(listeners.indexOf(listener), 1);
    };
}