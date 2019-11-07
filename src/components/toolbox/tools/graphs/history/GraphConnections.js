import React, { useEffect, useState } from 'react';
import { DatePicker, Empty } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import withProCheck from 'containers/WithProCheck';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getDateTimeFormat } from 'utils/SettingUtils';

function GraphConnections({ instanceId }) {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [range, setRange] = useState([moment().subtract(1, 'day'), moment()]);
    const [reports, setReports] = useState([]);

    const refresh = async () => {
        if (range && range[0] && range[1]) {
            const reports = await instanceApi.getReports(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString(),
                ['connected_clients', 'blocked_clients']);

            setReports(reports);
        }
    };

    useEffect(() => {
        refresh();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (reports.length === 0) {
        return (
            <Panel.Sub>
                <Empty description="No data to display" />
            </Panel.Sub>
        );
    }

    const data = reports.map(report => ({
        timestamp: moment(report.creationDate).unix(),
        connectedClients: Number.parseInt(report.info.connected_clients),
        blockedClients: Number.parseInt(report.info.blocked_clients)
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
            alias: 'Connected Clients',
            min: 0
        },
        blockedClients: {
            alias: 'Blocked Clients',
            min: 0
        }
    };

    return (
        <React.Fragment>
            <Panel.Sub>
                <Panel.Standard>
                    <DatePicker.RangePicker
                        value={range}
                        onChange={setRange}
                        allowClear={false}
                        disabledDate={current => {
                            return current && (
                                current.isBefore(moment().subtract(5, 'day')) ||
                                current.isAfter(moment()));
                        }}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                        }}
                        format={getDateTimeFormat(settingsApi.settings)} />
                    <PromiseButton onClick={refresh} style={{ marginLeft: 10 }}>
                        <Icon icon="sync-alt" text="Query" />
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

export default withProCheck(GraphConnections);