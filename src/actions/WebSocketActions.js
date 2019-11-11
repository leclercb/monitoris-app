import { Auth } from 'aws-amplify';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { getConfig } from 'config/Config';

let webSocket = null;

export async function connectWebSocket() {
    if (webSocket) {
        return;
    }

    const url = new URL(getConfig().wsUrl);
    url.searchParams.set('token_type', 'bearer');
    url.searchParams.set('access_token', (await Auth.currentSession()).getAccessToken().getJwtToken());

    // eslint-disable-next-line require-atomic-updates
    webSocket = new ReconnectingWebSocket(url.href);
    console.debug('WebSocket connected');
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
    webSocket.addEventListener('message', listener);
    return () => webSocket.removeEventListener('message', listener);
}

export function removeMessageListener(listener) {
    webSocket.removeEventListener('message', listener);
}