import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { formatDate } from 'utils/SettingUtils';

function GraphConnections({ instanceId }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instanceId);
    const settingsApi = useSettingsApi();

    const [infos, setInfos] = useState([]);

    const refresh = async () => {

    };

    useEffect(() => {
        refresh();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (infos.length === 0) {
        return (
            <Panel.Sub>
                <Empty description="No data to display" />
            </Panel.Sub>
        );
    }

    const data = infos.map(info => ({
        timestamp: moment(info.timestamp).unix(),
        connectedClients: Number.parseInt(info.connected_clients),
        blockedClients: Number.parseInt(info.blocked_clients)
    }));

    const cols = {
        timestamp: {
            alias: 'Timestamp',
            formatter: value => {
                if (/^[0-9]+$/.test(value)) {
                    return `${moment(value * 1000).format('HH:mm:ss')}`;
                }

                return '';
            }
        },
        connectedClients: {
            alias: 'Connected Clients'
        },
        blockedClients: {
            alias: 'Blocked Clients'
        }
    };

    return (
        <React.Fragment>
            <Panel.Sub>
                <Panel.Standard>
                    <PromiseButton onClick={refresh}>
                        <Icon icon="sync-alt" text={`Refresh (${formatDate(instanceStateApi.info.timestamp, settingsApi.settings, true)})`} />
                    </PromiseButton>
                </Panel.Standard>
            </Panel.Sub>
            <Panel.Sub grow>
                <AutoSizer>
                    {({ width, height }) => (
                        <Chart width={width} height={height} data={data} scale={cols} padding="auto" forceFit>
                            <Legend />
                            <Axis
                                name="timestamp"
                                title={{
                                    autoRotate: true,
                                    textStyle: {
                                        fill: 'black',
                                        fontWeight: 'bold'
                                    }
                                }} />
                            <Axis
                                name="connectedClients"
                                title={{
                                    autoRotate: true,
                                    textStyle: {
                                        fill: 'black',
                                        fontWeight: 'bold'
                                    }
                                }} />
                            <Axis
                                name="blockedClients"
                                title={{
                                    autoRotate: true,
                                    textStyle: {
                                        fill: 'black',
                                        fontWeight: 'bold'
                                    }
                                }} />
                            <Tooltip
                                crosshairs={{
                                    type: 'y'
                                }}
                                g2-tooltip={{
                                    width: '200px'
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
        </React.Fragment>
    );
}

GraphConnections.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default GraphConnections;