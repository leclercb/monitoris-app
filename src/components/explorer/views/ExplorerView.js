import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import KeyData from 'components/explorer/keydata/KeyData';
import ExplorerSider from 'components/explorer/sider/ExplorerSider';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ExplorerView() {
    const settingsApi = useSettingsApi();

    const [keys, setKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onExplorerViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ explorerViewSplitPaneSize: size });
    };

    const onKeyDeleted = async redisKey => {
        setKeys(keys.filter(key => redisKey !== key));
        setSelectedKeys([]);
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
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys} />
                <KeyData
                    redisKey={selectedKeys.length === 1 ? selectedKeys[0] : null}
                    onKeyDeleted={onKeyDeleted} />
            </SplitPane>
        </React.Fragment>
    );
}

export default ExplorerView;