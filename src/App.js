import React, { useEffect } from 'react';
import { notification } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AppLayout from 'components/layout/AppLayout';
import withJoyride from 'containers/WithJoyride';
import { getSeverity } from 'data/DataSeverities';
import { useAlertApi } from 'hooks/UseAlertApi';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useWebSocketApi } from 'hooks/UseWebSocketApi';

import 'App.css';
import 'font-awesome.js';
import 'rc-color-picker/assets/index.css';
import 'react-virtualized/styles.css';
import 'components/common/table/VirtualizedTable.css';

function App() {
    const alertApi = useAlertApi();
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
                        instanceApi.getStatus(message.instanceId);

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
                        instanceApi.getStatus(message.instanceId);

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
                    case 'alert_notification': {
                        instanceApi.getStatus(message.instanceId);

                        const data = message.data;
                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);
                        const alert = alertApi.alerts.find(alert => alert.id === data.alertId);
                        const severity = getSeverity(data.severity);

                        if (instance && alert && severity) {
                            if (data.backToNormal) {
                                notification.success({
                                    message: (
                                        <span>
                                            Alert "
                                            <strong>{alert.title}</strong>
                                            " for instance "
                                            <strong>{instance.title}</strong>
                                            " back to normal
                                        </span>
                                    )
                                });
                            } else {
                                notification[severity.notificationType]({
                                    message: (
                                        <span>
                                            <strong>{severity.title}</strong>
                                            " alert "
                                            <strong>{alert.title}</strong>
                                            " for instance "
                                            <strong>{instance.title}</strong>
                                            "
                                        </span>
                                    )
                                });
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
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);