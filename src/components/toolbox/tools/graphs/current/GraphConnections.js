import React, { useEffect } from 'react';
import { Empty } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
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

    useEffect(() => {
        if (!instanceStateApi.info) {
            instanceApi.getInfo(instanceId);
        }
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!instanceStateApi.info) {
        return (
            <Panel.Sub>
                <Empty description="No data to display" />
            </Panel.Sub>
        );
    }

    const refresh = async () => {
        await instanceApi.getInfo(instanceId);
    };

    const data = [
        { key: 'connected_clients', value: Number.parseInt(instanceStateApi.info.connected_clients) },
        { key: 'blocked_clients', value: Number.parseInt(instanceStateApi.info.blocked_clients) }
    ];

    const cols = {
        key: {
            alias: 'Category',
            formatter: value => {
                switch (value) {
                    case 'connected_clients': return 'Connected Clients';
                    case 'blocked_clients': return 'Blocked Clients';
                    default: return null;
                }
            }
        },
        value: {
            alias: 'Clients'
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
                                name="key"
                                title={{
                                    autoRotate: true,
                                    textStyle: {
                                        fill: 'black',
                                        fontWeight: 'bold'
                                    }
                                }} />
                            <Axis
                                name="value"
                                position="left"
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
                                type="interval"
                                position="key*value"
                                color="#44a2fc" />
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