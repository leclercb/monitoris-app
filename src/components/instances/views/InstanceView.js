import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import InstanceEdition from 'components/instances/common/InstanceEdition';
import InstanceSider from 'components/instances/sider/InstanceSider';
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
            <InstanceSider />
            <div style={{ height: '100%', padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    {instanceApi.selectedInstance ? (
                        <InstanceEdition key={instanceApi.selectedInstanceId} instance={instanceApi.selectedInstance} updateInstance={instanceApi.updateInstance} />
                    ) : <Empty description="Please select an alert" />}
                </div>
            </div>
        </SplitPane>
    );
}

export default InstanceView;