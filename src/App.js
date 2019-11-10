import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AlertTitle from 'components/alerts/common/AlertTitle';
import ModalInstanceAlert from 'components/instances/alerts/ModalInstanceAlert';
import InstanceTitle from 'components/instances/common/InstanceTitle';
import AppLayout from 'components/layout/AppLayout';
import SeverityTitle from 'components/severities/SeverityTitle';
import withJoyride from 'containers/WithJoyride';
import { getSeverity } from 'data/DataSeverities';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { useWebSocketApi } from 'hooks/UseWebSocketApi';

import 'App.css';
import 'font-awesome.js';
import 'rc-color-picker/assets/index.css';
import 'react-virtualized/styles.css';
import 'components/common/table/VirtualizedTable.css';

function App() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();
    const webSocketApi = useWebSocketApi();

    const [visibleInstanceAlert, setVisibleInstanceAlert] = useState(null);

    useEffect(() => {
        appApi.loadData();
        webSocketApi.connectWebSocket();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const removeMessageListener = webSocketApi.addMessageListener(event => {
            try {
                const message = JSON.parse(event.data);

                console.debug('Message received', message);

                if (!settingsApi.settings.showAlertsInBrowser) {
                    return;
                }

                switch (message.type) {
                    case 'proxy_connected': {
                        instanceApi.getStatus(message.instanceId);

                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);

                        if (instance) {
                            if (message.data) {
                                notification.success({
                                    message: 'Proxy Status',
                                    description: `The proxy "${instance.title}" is now connected`,
                                    duration: 10
                                });
                            } else {
                                notification.warning({
                                    message: 'Proxy Status',
                                    description: `The proxy "${instance.title}" is now disconnected`,
                                    duration: 10
                                });
                            }
                        }

                        break;
                    }
                    case 'redis_connected': {
                        instanceApi.getStatus(message.instanceId);

                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);

                        if (instance) {
                            if (message.data) {
                                notification.success({
                                    message: 'Redis Server Status',
                                    description: `The Redis server "${instance.title}" is now connected`,
                                    duration: 10
                                });
                            } else {
                                notification.warning({
                                    message: 'Redis Server Status',
                                    description: `The Redis server "${instance.title}" is now disconnected`,
                                    duration: 10
                                });
                            }
                        }

                        break;
                    }
                    case 'alert_notification': {
                        instanceApi.getStatus(message.instanceId);

                        const { data } = message;
                        const currSeverity = getSeverity(data.currSeverity);

                        notification[currSeverity.notificationType]({
                            message: 'Alert',
                            description: (
                                <React.Fragment>
                                    <div>
                                        Alert &quot;
                                            <AlertTitle alertId={message.alertId} />
                                        &quot; severity for instance &quot;
                                            <InstanceTitle instanceId={message.instanceId} />
                                        &quot; changed from &quot;
                                            <SeverityTitle severityId={data.prevSeverity} />
                                        &quot; to &quot;
                                            <SeverityTitle severityId={data.currSeverity} />
                                        &quot;
                                        </div>
                                    <div style={{ marginTop: 10 }}>
                                        <Button size="small" onClick={() => {
                                            setVisibleInstanceAlert({
                                                id: moment().toISOString(),
                                                instance: message.instanceId,
                                                alert: message.alertId,
                                                ...data
                                            });
                                        }}>Show more</Button>
                                    </div>
                                </React.Fragment>
                            ),
                            duration: 10
                        });

                        break;
                    }
                    default:
                        break;
                }
            } catch (e) {
                console.error(e);
                // Skip message
            }
        });

        return removeMessageListener;
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <ModalInstanceAlert
                instanceAlert={visibleInstanceAlert}
                visible={!!visibleInstanceAlert}
                onClose={() => setVisibleInstanceAlert(null)} />
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);