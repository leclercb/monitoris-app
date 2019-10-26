import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessageListener, connectWebSocket, removeMessageListener } from 'actions/WebSocketActions';

export function useWebSocketApi() {
    const dispatch = useDispatch();

    const connectWebSocketCallback = useCallback(
        () => dispatch(connectWebSocket()),
        [dispatch]
    );

    const addMessageListenerCallback = useCallback(
        listener => dispatch(addMessageListener(listener)),
        [dispatch]
    );

    const removeMessageListenerCallback = useCallback(
        listener => dispatch(removeMessageListener(listener)),
        [dispatch]
    );

    return {
        connectWebSocket: connectWebSocketCallback,
        addMessageListener: addMessageListenerCallback,
        removeMessageListener: removeMessageListenerCallback
    };
}