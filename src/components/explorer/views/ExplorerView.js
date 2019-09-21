import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import ExplorerSider from 'components/explorer/sider/ExplorerSider';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ExplorerView() {
    const settingsApi = useSettingsApi();

    const onExplorerViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ explorerViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.explorerViewSplitPaneSize}
            onDragFinished={size => onExplorerViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <ExplorerSider />
            <div style={{ height: '100%', padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    <Empty />
                </div>
            </div>
        </SplitPane>
    );
}

export default ExplorerView;