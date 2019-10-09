import React, { useEffect } from 'react';
import { notification } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AppLayout from 'components/layout/AppLayout';
import withJoyride from 'containers/WithJoyride';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useWebSocketApi } from 'hooks/UseWebSocketApi';

import 'App.css';
import 'font-awesome.js';
import 'rc-color-picker/assets/index.css';
import 'react-virtualized/styles.css';
import 'components/common/table/VirtualizedTable.css';

function App() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const webSocketApi = useWebSocketApi();

    useEffect(() => {
        appApi.loadData();
        webSocketApi.connectWebSocket();
    }, []);

    useEffect(() => {
        const removeMessageListener = webSocketApi.addMessageListener(event => {
            try {
                console.debug('Message received', event);

                const message = JSON.parse(event.data);

                switch (message.type) {
                    case 'proxy_status': {
                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);

                        if (instance) {
                            switch (message.data) {
                                case 'connected':
                                    notification.success({
                                        message: `The proxy "${instance.title}" is now connected`
                                    });
                                    break;
                                case 'disconnected':
                                    notification.warning({
                                        message: `The proxy "${instance.title}" is now disconnected`
                                    });
                                    break;
                                default:
                                    notification.error({
                                        message: `The proxy "${instance.title}" is now disconnected (${message.data})`
                                    });
                                    break;
                            }
                        }

                        break;
                    }
                    case 'redis_status': {
                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);

                        if (instance) {
                            switch (message.data) {
                                case 'ready':
                                    notification.success({
                                        message: `The Redis server "${instance.title}" is now connected`
                                    });
                                    break;
                                case 'disconnected':
                                    notification.warning({
                                        message: `The Redis server "${instance.title}" is now disconnected`
                                    });
                                    break;
                                default:
                                    notification.error({
                                        message: `The Redis server "${instance.title}" is now disconnected (${message.data})`
                                    });
                                    break;
                            }
                        }

                        break;
                    }
                    default:
                        break;
                }
            } catch (e) {
                // Skip message
            }
        });

        return removeMessageListener;
    }, [instanceApi.instances]);

    return (
        <DndProvider backend={HTML5Backend}>
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);