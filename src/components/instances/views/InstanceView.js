import React from 'react';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import EmptyInstance from 'components/common/empty/EmptyInstance';
import InstanceEdition from 'components/instances/common/InstanceEdition';
import InstanceSider from 'components/instances/sider/InstanceSider';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function InstanceView() {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const onInstanceViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ instanceViewSplitPaneSize: size });
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.instanceViewSplitPaneSize}
            onDragFinished={size => onInstanceViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <InstanceSider />
            <Panel.Main>
                <Panel.Sub>
                    {instanceApi.selectedInstance ? (
                        <InstanceEdition
                            key={instanceApi.selectedInstanceId}
                            instance={instanceApi.selectedInstance}
                            updateInstance={instanceApi.updateInstance} />
                    ) : (<EmptyInstance />)}
                </Panel.Sub>
            </Panel.Main>
        </SplitPane>
    );
}

export default InstanceView;