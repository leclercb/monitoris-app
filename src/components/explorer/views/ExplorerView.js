import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import KeyData from 'components/explorer/keydata/KeyData';
import ExplorerSider from 'components/explorer/sider/ExplorerSider';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ExplorerView() {
    const settingsApi = useSettingsApi();

    const [selectedKeys, setSelectedKeys] = useState([]);

    const onExplorerViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ explorerViewSplitPaneSize: size });
    };

    return (
        <React.Fragment>
            <SplitPane
                split="vertical"
                minSize={200}
                defaultSize={settingsApi.settings.explorerViewSplitPaneSize}
                onDragFinished={size => onExplorerViewSplitPaneSizeChange(size)}
                paneStyle={{ overflowY: 'auto' }}>
                <ExplorerSider selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
                <div style={{ minHeight: '100%', padding: 25 }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                        <KeyData redisKey={selectedKeys.length === 1 ? selectedKeys[0] : null} />
                    </div>
                </div>
            </SplitPane>
        </React.Fragment>
    );
}

export default ExplorerView;