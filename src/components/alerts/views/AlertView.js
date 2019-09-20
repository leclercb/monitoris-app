import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import AlertForm from 'components/alerts/common/AlertForm';
import AlertList from 'components/alerts/common/AlertList';
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
            <AlertList />
            <div style={{ height: '100%' }}>
                {alertApi.selectedAlert ? (
                    <AlertForm key={alertApi.selectedAlertId} alert={alertApi.selectedAlert} updateAlert={alertApi.updateAlert} />
                ) : <Empty description="Please select an alert" />}
            </div>
        </SplitPane>
    );
}

export default AlertView;