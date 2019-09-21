import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import AlertForm from 'components/alerts/common/AlertForm';
import AlertSider from 'components/alerts/sider/AlertSider';
import { useAlertApi } from 'hooks/UseAlertApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function AlertView() {
    const alertApi = useAlertApi();
    const settingsApi = useSettingsApi();

    const onAlertViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ alertViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.alertViewSplitPaneSize}
            onDragFinished={size => onAlertViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <AlertSider />
            <div style={{ height: '100%', padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    {alertApi.selectedAlert ? (
                        <AlertForm key={alertApi.selectedAlertId} alert={alertApi.selectedAlert} updateAlert={alertApi.updateAlert} />
                    ) : <Empty description="Please select an alert" />}
                </div>
            </div>
        </SplitPane>
    );
}

export default AlertView;