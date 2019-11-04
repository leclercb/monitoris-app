import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import EmptyInstance from 'components/common/empty/EmptyInstance';
import ClientTool from 'components/toolbox/tools/ClientTool';
import InfoTool from 'components/toolbox/tools/InfoTool';
import TerminalTool from 'components/toolbox/tools/TerminalTool';
import GraphConnections from 'components/toolbox/tools/graphs/GraphConnections';
import GraphCommands from 'components/toolbox/tools/graphs/GraphCommands';
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
                    <EmptyInstance />
                </Panel.Sub>
            );
        }

        switch (appApi.selectedToolId) {
            case 'info':
                return (<InfoTool />);
            case 'clients':
                return (<ClientTool />);
            case 'terminal':
                return (<TerminalTool />);
            case 'graphs:connections':
                return (<GraphConnections instanceId={instanceId} />);
            case 'graphs:commands':
                return (<GraphCommands instanceId={instanceId} />);
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