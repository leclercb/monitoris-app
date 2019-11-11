import { Auth } from 'aws-amplify';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { getConfig } from 'config/Config';

let webSocket = null;
const listeners = [];

export async function connectWebSocket() {
    if (webSocket) {
        return;
    }

    const url = new URL(getConfig().wsUrl);
    url.searchParams.set('token_type', 'bearer');
    url.searchParams.set('access_token', (await Auth.currentSession()).getAccessToken().getJwtToken());

    const options = {
        minReconnectionDelay: 1000,
        maxReconnectionDelay: 1000,
        reconnectionDelayGrowFactor: 1
    };

    // eslint-disable-next-line require-atomic-updates
    webSocket = new ReconnectingWebSocket(url.href, [], options);
    console.debug('WebSocket connected');

    webSocket.addEventListener('message', event => {
        listeners.forEach(listener => listener(event));
    });
}

export function closeWebSocket() {
    if (!webSocket) {
        return;
    }

    webSocket.close();
    webSocket = null;
    console.debug('WebSocket closed');
}

export function addMessageListener(listener) {
    listeners.push(listener);
    return () => listeners.splice(listeners.indexOf(listener), 1);
}

export function removeMessageListener(listener) {
    listeners.splice(listeners.indexOf(listener), 1);
}