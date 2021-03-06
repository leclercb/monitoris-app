import React, { useEffect } from 'react';
import { Empty, Typography } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getHumanFileSize } from 'utils/FileUtils';
import { formatDate } from 'utils/SettingUtils';

function GraphMemory({ instanceId }) {
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
        { key: 'used_memory', value: Number.parseInt(instanceStateApi.info.used_memory) },
        { key: 'used_memory_dataset', value: Number.parseInt(instanceStateApi.info.used_memory_dataset) },
        { key: 'used_memory_lua', value: Number.parseInt(instanceStateApi.info.used_memory_lua) },
        { key: 'used_memory_overhead', value: Number.parseInt(instanceStateApi.info.used_memory_overhead) },
        { key: 'used_memory_peak', value: Number.parseInt(instanceStateApi.info.used_memory_peak) },
        { key: 'used_memory_rss', value: Number.parseInt(instanceStateApi.info.used_memory_rss) },
        { key: 'used_memory_scripts', value: Number.parseInt(instanceStateApi.info.used_memory_scripts) },
        { key: 'used_memory_startup', value: Number.parseInt(instanceStateApi.info.used_memory_startup) }
    ];

    const scale = {
        key: {
            alias: 'Category',
            formatter: value => {
                switch (value) {
                    case 'used_memory': return 'Used';
                    case 'used_memory_dataset': return 'Dataset';
                    case 'used_memory_lua': return 'LUA';
                    case 'used_memory_overhead': return 'Overhead';
                    case 'used_memory_peak': return 'Peak';
                    case 'used_memory_rss': return 'Resident Set Size';
                    case 'used_memory_scripts': return 'Scripts';
                    case 'used_memory_startup': return 'Startup';
                    default: return null;
                }
            }
        },
        value: {
            alias: 'Memory',
            formatter: value => getHumanFileSize(value)
        }
    };

    return (
        <React.Fragment>
            <Panel.Sub>
                <LeftRight right={(
                    <div style={{ marginLeft: 20, paddingTop: 5 }}>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {`Total System Memory: ${getHumanFileSize(Number.parseInt(instanceStateApi.info.total_system_memory))}`}
                        </Typography.Title>
                    </div>
                )}>
                    <PromiseButton onClick={refresh}>
                        <Icon icon="sync-alt" text={`Refresh (${formatDate(instanceStateApi.info.timestamp, settingsApi.settings, true)})`} />
                    </PromiseButton>
                </LeftRight>
            </Panel.Sub>
            <Panel.Sub grow>
                <AutoSizer>
                    {({ width, height }) => (
                        <Chart width={width} height={height} data={data} scale={scale} padding="auto" forceFit>
                            <Legend />
                            <Axis
                                name="key"
                                title={{
                                    autoRotate: true,
                                    style: {
                                        fill: 'black',
                                        fontWeight: 'bold'
                                    }
                                }} />
                            <Axis
                                name="value"
                                position="left"
                                title={{
                                    autoRotate: true,
                                    style: {
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

GraphMemory.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default GraphMemory;