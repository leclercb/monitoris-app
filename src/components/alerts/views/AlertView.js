import React from 'react';
import SplitPane from 'react-split-pane';
import AlertForm from 'components/alerts/common/AlertForm';
import AlertList from 'components/alerts/common/AlertList';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function AlertView() {
    const settingsApi = useSettingsApi();

    const onAlertViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ alertViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    const onAlertViewSubSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ alertViewSubSplitPaneSize: size });
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
            <SplitPane
                split={settingsApi.settings.alertViewSubSplitPaneMode}
                minSize={200}
                defaultSize={settingsApi.settings.alertViewSubSplitPaneSize}
                onDragFinished={size => onAlertViewSubSplitPaneSizeChange(size)}
                primary="second"
                paneStyle={{ overflowY: 'auto' }}>
                <div style={{ height: '100%' }}>
                    <AlertForm />
                </div>
            </SplitPane>
        </SplitPane>
    );
}

export default AlertView;