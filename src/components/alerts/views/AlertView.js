import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import AlertEdition from 'components/alerts/common/AlertEdition';
import AlertSider from 'components/alerts/sider/AlertSider';
import Panel from 'components/common/Panel';
import { useAlertApi } from 'hooks/UseAlertApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function AlertView() {
    const alertApi = useAlertApi();
    const settingsApi = useSettingsApi();

    const onAlertViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ alertViewSplitPaneSize: size });
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.alertViewSplitPaneSize}
            onDragFinished={size => onAlertViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <AlertSider />
            <Panel.Main>
                <Panel.Sub>
                    {alertApi.selectedAlert ? (
                        <AlertEdition
                            key={alertApi.selectedAlertId}
                            alert={alertApi.selectedAlert}
                            updateAlert={alertApi.updateAlert}
                            testNotification={alertApi.testNotification} />
                    ) : <Empty description="Please select an alert" />}
                </Panel.Sub>
            </Panel.Main>
        </SplitPane>
    );
}

export default AlertView;