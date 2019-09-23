import React from 'react';
import { Layout, Spin } from 'antd';
import { useSelector } from 'react-redux';
import AlertView from 'components/alerts/views/AlertView';
import ExplorerView from 'components/explorer/views/ExplorerView';
import InstanceView from 'components/instances/views/InstanceView';
import Header from 'components/layout/Header';
import ModalSettingManager from 'components/settings/ModalSettingManager';
import NotificationManager from 'components/thread/NotificationManager';
import ModalThreadManager from 'components/thread/ModalThreadManager';
import { getSelectedView } from 'selectors/SettingSelectors';
import { isBusy } from 'selectors/ThreadSelectors';

function AppLayout() {
    const busy = useSelector(isBusy);
    const selectedView = useSelector(getSelectedView);

    const getView = () => {
        switch (selectedView) {
            case 'explorer':
                return <ExplorerView />;
            case 'alert':
                return <AlertView />;
            case 'instance':
                return <InstanceView />;
            default:
                return <AlertView />;
        }
    };

    return (
        <React.Fragment>
            <NotificationManager />
            <ModalThreadManager />
            <ModalSettingManager />
            <Spin style={{ minHeight: '100%', height: '100%' }} spinning={busy}>
                <Layout style={{ minHeight: '100%', height: '100%' }}>
                    <Layout.Header>
                        <Header />
                    </Layout.Header>
                    <Layout style={{ height: '100%', position: 'relative' }}>
                        {getView()}
                    </Layout>
                </Layout>
            </Spin>
        </React.Fragment>
    );
}

export default AppLayout;