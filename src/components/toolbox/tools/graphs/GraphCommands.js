import React, { useEffect } from 'react';
import { Empty } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Panel from 'components/common/Panel';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { parseRedisSubString } from 'utils/FormatUtils';

function GraphConnections({ instanceId }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instanceId);

    useEffect(() => {
        instanceApi.getInfo(instanceId);
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!instanceStateApi.lastInfo) {
        return (
            <Panel.Sub>
                <Empty description="No data to display" />
            </Panel.Sub>
        );
    }

    const data = Object.keys(instanceStateApi.lastInfo).filter(key => key.startsWith('cmdstat_')).map(key => {
        const cmdStat = parseRedisSubString(instanceStateApi.lastInfo[key]);

        return {
            command: key.substr('cmdstat_'.length),
            calls: Number.parseInt(cmdStat.calls),
            usec: Number.parseInt(cmdStat.usec),
            usecPerCall: Number.parseFloat(cmdStat.usec_per_call)
        };
    });

    const cols = {
        command: {
            alias: 'Command'
        },
        calls: {
            alias: 'Calls'
        }
    };

    return (
        <Panel.Sub grow>
            <AutoSizer>
                {({ width, height }) => (
                    <Chart width={width} height={height} data={data} scale={cols} padding="auto" forceFit>
                        <Legend />
                        <Axis
                            name="command"
                            title={{
                                autoRotate: true
                            }} />
                        <Axis
                            name="calls"
                            title={{
                                autoRotate: true
                            }} />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }} />
                        <Geom
                            type="interval"
                            position="command*calls"
                            color="command" />
                    </Chart>
                )}
            </AutoSizer>
        </Panel.Sub>
    );
}

GraphConnections.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default GraphConnections;