import React from 'react';
import SplitPane from 'react-split-pane';
import InstanceForm from 'components/instances/common/InstanceForm';
import InstanceList from 'components/instances/common/InstanceList';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function InstanceView() {
    const settingsApi = useSettingsApi();

    const onInstanceViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ instanceViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    const onInstanceViewSubSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ instanceViewSubSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.instanceViewSplitPaneSize}
            onDragFinished={size => onInstanceViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <InstanceList />
            <SplitPane
                split={settingsApi.settings.instanceViewSubSplitPaneMode}
                minSize={200}
                defaultSize={settingsApi.settings.instanceViewSubSplitPaneSize}
                onDragFinished={size => onInstanceViewSubSplitPaneSizeChange(size)}
                primary="second"
                paneStyle={{ overflowY: 'auto' }}>
                <div style={{ height: '100%' }}>
                    <InstanceForm />
                </div>
            </SplitPane>
        </SplitPane>
    );
}

export default InstanceView;