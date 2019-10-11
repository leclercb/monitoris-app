import React, { useEffect } from 'react';
import { Button, Descriptions, Modal, Table, notification } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AppLayout from 'components/layout/AppLayout';
import SeverityTitle from 'components/severities/SeverityTitle';
import withJoyride from 'containers/WithJoyride';
import { getRedisField } from 'data/DataRedisFields';
import { getSeverity } from 'data/DataSeverities';
import { useAlertApi } from 'hooks/UseAlertApi';
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
    const alertApi = useAlertApi();
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();
    const webSocketApi = useWebSocketApi();

    const showMore = (message, instance, alert) => {
        const columns = [
            {
                title: 'Field',
                dataIndex: 'field',
                key: 'field',
                render: value => <strong>{value}</strong>
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value'
            },
            {
                title: 'Severity',
                dataIndex: 'severity',
                key: 'severity',
                render: value => <SeverityTitle severityId={value} />
            }
        ];

        const dataSource = Object.keys(message.data.fields).map(key => {
            const alertField = message.data.fields[key];
            const redisField = getRedisField(key);

            return {
                field: redisField.title,
                value: alertField.value,
                severity: alertField.severity
            };
        });

        Modal.info({
            title: 'Alert Details',
            content: (
                <React.Fragment>
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Alert">{alert.title}</Descriptions.Item>
                        <Descriptions.Item label="Instance">{instance.title}</Descriptions.Item>
                        <Descriptions.Item label="Severity">
                            <SeverityTitle severityId={message.data.backToNormal ? 'norm' : message.data.severity} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Table columns={columns} dataSource={dataSource} pagination={false} size="small" style={{ marginTop: 20 }} />
                </React.Fragment>
            ),
            width: 800
        });
    };

    useEffect(() => {
        appApi.loadData();
        webSocketApi.connectWebSocket();
    }, []);

    useEffect(() => {
        const removeMessageListener = webSocketApi.addMessageListener(event => {
            try {
                const message = JSON.parse(event.data);

                console.debug('Message received', message);

                if (!settingsApi.settings.showAlertsInBrowser) {
                    return;
                }

                switch (message.type) {
                    case 'proxy_status': {
                        instanceApi.getStatus(message.instanceId);

                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);

                        if (instance) {
                            switch (message.data) {
                                case 'connected':
                                    notification.success({
                                        message: 'Proxy Status',
                                        description: `The proxy "${instance.title}" is now connected`,
                                        duration: 10
                                    });
                                    break;
                                case 'disconnected':
                                    notification.warning({
                                        message: 'Proxy Status',
                                        description: `The proxy "${instance.title}" is now disconnected`,
                                        duration: 10
                                    });
                                    break;
                                default:
                                    notification.error({
                                        message: 'Proxy Status',
                                        description: `The proxy "${instance.title}" is now disconnected (${message.data})`,
                                        duration: 10
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
                                        message: 'Redis Server Status',
                                        description: `The Redis server "${instance.title}" is now connected`,
                                        duration: 10
                                    });
                                    break;
                                case 'disconnected':
                                    notification.warning({
                                        message: 'Redis Server Status',
                                        description: `The Redis server "${instance.title}" is now disconnected`,
                                        duration: 10
                                    });
                                    break;
                                default:
                                    notification.error({
                                        message: 'Redis Server Status',
                                        description: `The Redis server "${instance.title}" is now disconnected (${message.data})`,
                                        duration: 10
                                    });
                                    break;
                            }
                        }

                        break;
                    }
                    case 'alert_notification': {
                        instanceApi.getStatus(message.instanceId);

                        const { data } = message;
                        const instance = instanceApi.instances.find(instance => instance.id === message.instanceId);
                        const alert = alertApi.alerts.find(alert => alert.id === data.alertId);
                        const severity = getSeverity(data.severity);

                        if (instance && alert && severity) {
                            if (data.backToNormal) {
                                notification.success({
                                    message: 'Alert',
                                    description: (
                                        <React.Fragment>
                                            <div>
                                                Alert &quot;
                                                <strong>{alert.title}</strong>
                                                &quot; for instance &quot;
                                                <strong>{instance.title}</strong>
                                                &quot; back to normal
                                            </div>
                                            <div style={{ marginTop: 10 }}>
                                                <Button size="small" onClick={() => showMore(message, instance, alert)}>Show more</Button>
                                            </div>
                                        </React.Fragment>
                                    ),
                                    duration: 10
                                });
                            } else {
                                notification[severity.notificationType]({
                                    message: 'Alert',
                                    description: (
                                        <React.Fragment>
                                            <div>
                                                &quot;
                                                <strong>{severity.title}</strong>
                                                &quot; alert &quot;
                                                <strong>{alert.title}</strong>
                                                &quot; for instance &quot;
                                                <strong>{instance.title}</strong>
                                                &quot;
                                            </div>
                                            <div style={{ marginTop: 10 }}>
                                                <Button size="small" onClick={() => showMore(message, instance, alert)}>Show more</Button>
                                            </div>
                                        </React.Fragment>
                                    ),
                                    duration: 10
                                });
                            }
                        }

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
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);