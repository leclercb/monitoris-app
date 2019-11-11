import {
    addMessageListener,
    closeWebSocket,
    connectWebSocket,
    removeMessageListener
} from 'actions/WebSocketActions';

export function useWebSocketApi() {
    return {
        connectWebSocket,
        closeWebSocket,
        addMessageListener,
        removeMessageListener
    };
}