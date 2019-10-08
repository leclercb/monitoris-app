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
        webSocketApi.addMessageListener(event => {
            try {
                const message = JSON.parse(event.data);

                switch (message.type) {
                    case 'instance_connected': {
                        const instance = instanceApi.instances.find(instance => instance.id === message.data);

                        if (instance) {
                            notification.success({
                                message: `The instance "${instance.title}" is now connected`
                            });
                        }

                        break;
                    }
                    case 'instance_disconnected': {
                        const instance = instanceApi.instances.find(instance => instance.id === message.data);

                        if (instance) {
                            notification.warning({
                                message: `The instance "${instance.title}" is now disconnected`
                            });
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
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);