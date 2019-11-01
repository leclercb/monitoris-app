import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import InfoTool from 'components/toolbox/tools/InfoTool';
import TerminalTool from 'components/toolbox/tools/TerminalTool';
import ToolboxSider from 'components/toolbox/sider/ToolboxSider';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ToolboxView() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const instanceId = instanceApi.selectedInstanceId;

    const onToolboxViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ toolboxViewSplitPaneSize: size });
    };

    const getToolFromId = () => {
        if (!instanceId) {
            return (
                <div style={{ minHeight: '100%', padding: 25 }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                        <Empty description="Please select an instance" />
                    </div>
                </div>
            );
        }

        switch (appApi.selectedToolId) {
            case 'info':
                return (<InfoTool />);
            case 'terminal':
                return (<TerminalTool />);
            default:
                return (<Empty />);
        }
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.toolboxViewSplitPaneSize}
            onDragFinished={size => onToolboxViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <ToolboxSider />
            {getToolFromId()}
        </SplitPane >
    );
}

export default ToolboxView;