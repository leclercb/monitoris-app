import React from 'react';
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

    useInterval(() => {
        instanceApi.getInfo(instanceId);
    }, 10000);

    const data = instanceStateApi.allInfo.map(info => ({
        seconds: moment(info.timestamp).diff(moment(), 'seconds'),
        connectedClients: Number.parseInt(info.connected_clients)
    }));

    return (
        <Panel.Sub>
            <Typography.Title>Clients</Typography.Title>
            <Chart height={400} data={data} forceFit>
                <Legend />
                <Axis
                    name="seconds"
                    label={{
                        formatter: val => `${val * -1} sec. ago`
                    }} />
                <Axis
                    name="connectedClients" />
                <Tooltip
                    crosshairs={{
                        type: 'y'
                    }} />
                <Geom
                    type="line"
                    position="seconds*connectedClients"
                    size={2}
                    color={'city'} />
                <Geom
                    type="point"
                    position="seconds*connectedClients"
                    size={4}
                    shape={'circle'}
                    color={'city'}
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