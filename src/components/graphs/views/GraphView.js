import React from 'react';
import { Empty } from 'antd';
import SplitPane from 'react-split-pane';
import Panel from 'components/common/Panel';
import EmptyInstance from 'components/common/empty/EmptyInstance';
import GraphCurrentCommands from 'components/graphs/graphs/current/GraphCommands';
import GraphCurrentMemory from 'components/graphs/graphs/current/GraphMemory';
import GraphHistoryCommands from 'components/graphs/graphs/history/GraphCommands';
import GraphHistoryConnections from 'components/graphs/graphs/history/GraphConnections';
import GraphHistoryMemory from 'components/graphs/graphs/history/GraphMemory';
import GraphHistoryOperations from 'components/graphs/graphs/history/GraphOperations';
import GraphSider from 'components/graphs/sider/GraphSider';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';

function GraphView() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const instanceId = instanceApi.selectedInstanceId;

    const onGraphViewSplitPaneSizeChange = size => {
        settingsApi.updateSettings({ graphViewSplitPaneSize: size });
    };

    const getGraphFromId = () => {
        if (!instanceId) {
            return (
                <Panel.Sub>
                    <EmptyInstance />
                </Panel.Sub>
            );
        }

        switch (appApi.selectedGraphId) {
            case 'current:commands':
                return (<GraphCurrentCommands instanceId={instanceId} />);
            case 'current:memory':
                return (<GraphCurrentMemory instanceId={instanceId} />);
            case 'history:commands':
                return (<GraphHistoryCommands instanceId={instanceId} />);
            case 'history:connections':
                return (<GraphHistoryConnections instanceId={instanceId} />);
            case 'history:memory':
                return (<GraphHistoryMemory instanceId={instanceId} />);
            case 'history:operations':
                return (<GraphHistoryOperations instanceId={instanceId} />);
            default:
                return (
                    <Panel.Sub>
                        <Empty description="Please select a graph" />
                    </Panel.Sub>
                );
        }
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={settingsApi.settings.graphViewSplitPaneSize}
            onDragFinished={size => onGraphViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <GraphSider />
            <Panel.Main showMonitor>
                {getGraphFromId()}
            </Panel.Main>
        </SplitPane>
    );
}

export default GraphView;