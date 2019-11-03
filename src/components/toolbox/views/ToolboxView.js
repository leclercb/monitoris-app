import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import InfoTool from 'components/toolbox/tools/InfoTool';
import TerminalTool from 'components/toolbox/tools/TerminalTool';
import Connections from 'components/toolbox/tools/graphs/Connections';
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
                <Panel.Sub>
                    <Empty description="Please select an instance" />
                </Panel.Sub>
            );
        }

        switch (appApi.selectedToolId) {
            case 'info':
                return (<InfoTool />);
            case 'terminal':
                return (<TerminalTool />);
            case 'graphs:connections':
                return (<Connections instanceId={instanceId} />);
            default:
                return (
                    <Panel.Sub>
                        <Empty description="Please select a tool" />
                    </Panel.Sub>
                );
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
            <Panel.Main>
                {getToolFromId()}
            </Panel.Main>
        </SplitPane>
    );
}

export default ToolboxView;