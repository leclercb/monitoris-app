import React from 'react';
import { Layout, Spin } from 'antd';
import { useSelector } from 'react-redux';
import ModalAccountManager from 'components/account/ModalAccountManager';
import AlertView from 'components/alerts/views/AlertView';
import DashboardView from 'components/dashboard/views/DashboardView';
import ExplorerView from 'components/explorer/views/ExplorerView';
import InstanceView from 'components/instances/views/InstanceView';
import GraphView from 'components/graphs/views/GraphView';
import Header from 'components/layout/Header';
import ModalSettingManager from 'components/settings/ModalSettingManager';
import NotificationManager from 'components/thread/NotificationManager';
import ModalThreadManager from 'components/thread/ModalThreadManager';
import ToolView from 'components/tools/views/ToolView';
import { getSelectedView } from 'selectors/SettingSelectors';
import { isBusy } from 'selectors/ThreadSelectors';

function AppLayout() {
    const busy = useSelector(isBusy);
    const selectedView = useSelector(getSelectedView);

    const getView = () => {
        switch (selectedView) {
            case 'alerts':
                return <AlertView />;
            case 'dashboards':
                return <DashboardView />;
            case 'explorer':
                return <ExplorerView />;
            case 'graphs':
                return <GraphView />;
            case 'instances':
                return <InstanceView />;
            case 'tools':
                return <ToolView />;
            default:
                return <AlertView />;
        }
    };

    return (
        <React.Fragment>
            <NotificationManager />
            <ModalThreadManager />
            <ModalAccountManager />
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