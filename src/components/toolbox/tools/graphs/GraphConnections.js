import React, { useEffect } from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Panel from 'components/common/Panel';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useInterval } from 'hooks/UseInterval';

function GraphConnections({ instanceId }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instanceId);

    useEffect(() => {
        instanceApi.getInfo(instanceId);
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    useInterval(() => {
        instanceApi.getInfo(instanceId);
    }, 10000);

    const data = instanceStateApi.allInfo.map(info => ({
        timestamp: moment(info.timestamp).unix(),
        connectedClients: Number.parseInt(info.connected_clients),
        blockedClients: Number.parseInt(info.blocked_clients)
    }));

    const cols = {
        timestamp: {
            alias: 'Timestamp'
        },
        connectedClients: {
            alias: 'Connected Clients'
        },
        blockedClients: {
            alias: 'Blocked Clients'
        }
    };

    return (
        <Panel.Sub grow>
            <AutoSizer>
                {({ width, height }) => (
                    <Chart width={width} height={height} data={data} scale={cols} padding="auto" forceFit>
                        <Legend />
                        <Axis
                            name="timestamp"
                            label={{
                                formatter: value => {
                                    if (/^[0-9]+$/.test(value)) {
                                        return `${moment(value * 1000).format('HH:mm:ss')}`;
                                    }

                                    return '';
                                }
                            }} />
                        <Axis
                            name="connectedClients"
                            title={{
                                autoRotate: true
                            }} />
                        <Axis
                            name="blockedClients"
                            title={{
                                autoRotate: true
                            }} />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }} />
                        <Geom
                            type="line"
                            position="timestamp*connectedClients"
                            size={2}
                            color="#44a2fc"
                            shape={'smooth'} />
                        <Geom
                            type="line"
                            position="timestamp*blockedClients"
                            size={2}
                            color="#fad34b"
                            shape={'smooth'} />
                        <Geom
                            type="point"
                            position="timestamp*connectedClients"
                            size={4}
                            color="#44a2fc"
                            shape={'circle'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }} />
                        <Geom
                            type="point"
                            position="timestamp*blockedClients"
                            size={4}
                            color="#fad34b"
                            shape={'circle'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }} />
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