import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import EmptyInstance from 'components/common/empty/EmptyInstance';
import ClientTool from 'components/tools/tools/current/ClientTool';
import InfoTool from 'components/tools/tools/current/InfoTool';
import TerminalTool from 'components/tools/tools/current/TerminalTool';
import AlertTool from 'components/tools/tools/history/AlertTool';
import ReportTool from 'components/tools/tools/history/ReportTool';
import ToolSider from 'components/tools/sider/ToolSider';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function ToolView() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const instanceId = instanceApi.selectedInstanceId;

    const onToolViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ toolViewSplitPaneSize: size });
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
            case 'current:info':
                return (<InfoTool />);
            case 'current:clients':
                return (<ClientTool />);
            case 'current:terminal':
                return (<TerminalTool />);
            case 'history:alert':
                return (<AlertTool />);
            case 'history:info':
                return (<ReportTool />);
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
            defaultSize={settingsApi.settings.toolViewSplitPaneSize}
            onDragFinished={size => onToolViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <ToolSider />
            <Panel.Main showMonitor>
                {getToolFromId()}
            </Panel.Main>
        </SplitPane>
    );
}

export default ToolView;