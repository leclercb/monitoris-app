import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import InfoTool from 'components/explorer/tools/InfoTool';
import ScanTool from 'components/explorer/tools/ScanTool';
import ExplorerSider from 'components/explorer/sider/ExplorerSider';
import { useAppApi } from 'hooks/UseAppApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ExplorerView() {
    const appApi = useAppApi();
    const settingsApi = useSettingsApi();

    const onExplorerViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ explorerViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    const getToolFromId = () => {
        switch (appApi.selectedExplorerToolId) {
            case 'info':
                return (<InfoTool />);
            case 'scan':
                return (<ScanTool />);
            default:
                return (<Empty />);
        }
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.explorerViewSplitPaneSize}
            onDragFinished={size => onExplorerViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <ExplorerSider />
            <div style={{ minHeight: '100%', padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    {getToolFromId()}
                </div>
            </div>
        </SplitPane>
    );
}

export default ExplorerView;