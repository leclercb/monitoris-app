import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import InstanceForm from 'components/instances/common/InstanceForm';
import InstanceList from 'components/instances/common/InstanceList';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function InstanceView() {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const onInstanceViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ instanceViewSplitPaneSize: size });
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
            <div style={{ height: '100%' }}>
                {instanceApi.selectedInstance ? (
                    <InstanceForm key={instanceApi.selectedInstanceId} instance={instanceApi.selectedInstance} updateInstance={instanceApi.updateInstance} />
                ) : <Empty description="Please select an alert" />}
            </div>
        </SplitPane>
    );
}

export default InstanceView;