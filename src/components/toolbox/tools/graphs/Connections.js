import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import Panel from 'components/common/Panel';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useInterval } from 'hooks/UseInterval';

function Connections({ instanceId }) {
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
        timestamp: {},
        connectedClients: {},
        blockedClients: {}
    };

    return (
        <Panel.Sub>
            <Typography.Title>Connections</Typography.Title>
            <Chart height={400} data={data} scale={cols} forceFit>
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
                    name="connectedClients" />
                <Axis
                    name="blockedClients" />
                <Tooltip
                    crosshairs={{
                        type: 'y'
                    }} />
                <Geom
                    type="line"
                    position="timestamp*connectedClients"
                    size={2}
                    color="#44a2fc" />
                <Geom
                    type="line"
                    position="timestamp*blockedClients"
                    size={2}
                    color="#fad34b" />
                <Geom
                    type="point"
                    position="timestamp*connectedClients"
                    size={4}
                    shape={'circle'}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1
                    }} />
                <Geom
                    type="point"
                    position="timestamp*blockedClients"
                    size={4}
                    shape={'circle'}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1
                    }} />
            </Chart>
        </Panel.Sub>
    );
}

Connections.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default Connections;