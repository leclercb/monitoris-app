import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import ConnectionsDashboard from 'components/dashboard/common/ConnectionsDashboard';
import StatusDashboard from 'components/dashboard/common/StatusDashboard';
import DashboardSider from 'components/dashboard/sider/DashboardSider';
import { useAppApi } from 'hooks/UseAppApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function DashboardView() {
    const appApi = useAppApi();
    const settingsApi = useSettingsApi();

    const onDashboardViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ dashboardViewSplitPaneSize: size });
    };

    const getDashboardFromId = () => {
        switch (appApi.selectedDashboardId) {
            case 'status':
                return (<StatusDashboard />);
            case 'connections':
                return (<ConnectionsDashboard />);
            default:
                return (<Empty />);
        }
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.dashboardViewSplitPaneSize}
            onDragFinished={size => onDashboardViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <DashboardSider />
            <Panel.Main>
                <Panel.Sub>
                    {getDashboardFromId()}
                </Panel.Sub>
            </Panel.Main>
        </SplitPane>
    );
}

export default DashboardView;