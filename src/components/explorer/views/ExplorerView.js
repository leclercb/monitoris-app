import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import KeyData from 'components/explorer/keydata/KeyData';
import ExplorerSider from 'components/explorer/sider/ExplorerSider';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ExplorerView() {
    const settingsApi = useSettingsApi();

    const [keys, setKeys] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);

    const onExplorerViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ explorerViewSplitPaneSize: size });
    };

    const onKeyDeleted = async redisKey => {
        setKeys(keys.filter(key => redisKey !== key));
        setSelectedObject(null);
    };

    return (
        <React.Fragment>
            <SplitPane
                split="vertical"
                minSize={200}
                defaultSize={settingsApi.settings.explorerViewSplitPaneSize}
                onDragFinished={size => onExplorerViewSplitPaneSizeChange(size)}
                paneStyle={{ overflowY: 'auto' }}>
                <ExplorerSider
                    keys={keys}
                    setKeys={setKeys}
                    selectedObject={selectedObject}
                    setSelectedObject={setSelectedObject} />
                <Panel.Main showMonitor>
                    <KeyData
                        object={selectedObject}
                        onKeyDeleted={onKeyDeleted} />
                </Panel.Main>
            </SplitPane>
        </React.Fragment>
    );
}

export default ExplorerView;