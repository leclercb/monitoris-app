import React, { useEffect, useState } from 'react';
import { DatePicker, Empty, Select } from 'antd';
import { Axis, Chart, Geom, Guide, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import { showGraphAlert } from 'components/toolbox/tools/graphs/GraphAlert';
import withProCheck from 'containers/WithProCheck';
import { useAlertApi } from 'hooks/UseAlertApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { parseRedisSubString } from 'utils/FormatUtils';
import { getDateTimeFormat } from 'utils/SettingUtils';

function GraphCommands({ instanceId }) {
    const fields = [
        'auth',
        'client',
        'cluster',
        'command',
        'del',
        'eval',
        'exec',
        'get',
        'getrange',
        'hdel',
        'hget',
        'hgetall',
        'hincrby',
        'hlen',
        'hscan',
        'hset',
        'incrby',
        'info',
        'keys',
        'mget',
        'multi',
        'ping',
        'pttl',
        'publish',
        'sadd',
        'scan',
        'scard',
        'select',
        'set',
        'setex',
        'slowlog',
        'smembers',
        'srandmember',
        'srem',
        'sscan',
        'strlen',
        'subscribe',
        'ttl',
        'type',
        'watch'
    ];

    const alertApi = useAlertApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [range, setRange] = useState([moment().subtract(1, 'day'), moment()]);
    const [alerts, setAlerts] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedField, setSelectedField] = useState(undefined);

    const refresh = async () => {
        if (range && range[0] && range[1] && selectedField) {
            const alerts = await instanceApi.getAlerts(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString());

            const reports = await instanceApi.getReports(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString(),
                [`cmdstat_${selectedField}`]);

            setAlerts([
                {
                    "alert": "1b02cd83-65e8-48d8-9261-2fee7e5dbbf6",
                    "currSeverity": "crit",
                    "fields": {
                        "connected_clients": {
                            "severity": "crit",
                            "value": "8"
                        }
                    },
                    "id": "2019-11-07T19:28:41.670Z",
                    "instance": "97e9389c-f82a-44dc-a946-c59a7df69bdc",
                    "prevSeverity": "norm"
                }
            ]);
            setReports(reports);
        }
    };

    useEffect(() => {
        const handler = event => {
            const alert = alerts.find(alert => alert.id === event.detail.alertId);
            showGraphAlert(alert, alertApi.alerts, instanceApi.instances, settingsApi.settings);
        }

        window.addEventListener('graph-alert', handler);

        return () => window.removeEventListener('graph-alert', handler);
    });


    useEffect(() => {
        setAlerts([]);
        setReports([]);
        refresh();
    }, [instanceId, selectedField]); // eslint-disable-line react-hooks/exhaustive-deps

    const data = reports.map(report => {
        const cmdStat = parseRedisSubString(report.info[`cmdstat_${selectedField}`]);

        return {
            timestamp: moment(report.id).unix(),
            calls: Number.parseInt(cmdStat.calls),
            usec_per_call: Number.parseFloat(cmdStat.usec_per_call)
        };
    });

    const scale = {
        timestamp: {
            alias: 'Timestamp',
            formatter: value => {
                if (/^[0-9]+$/.test(value)) {
                    return `${moment(value * 1000).format(getDateTimeFormat(settingsApi.settings))}`;
                }

                return '';
            }
        },
        calls: {
            alias: 'Calls',
            min: 0
        },
        usec_per_call: {
            alias: 'Microseconds Per Call',
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
                    <Select
                        value={selectedField}
                        showSearch={true}
                        allowClear={true}
                        placeholder="Please select a field"
                        onChange={value => setSelectedField(value)}
                        style={{ minWidth: 300, marginLeft: 20 }}>
                        {fields.map(field => (
                            <Select.Option key={field} value={field}>{field}</Select.Option>
                        ))}
                    </Select>
                </Panel.Standard>
            </Panel.Sub>
            {!selectedField && (
                <Panel.Sub>
                    <Empty description="Please select a field" />
                </Panel.Sub>
            )}
            {!!selectedField && (
                <Panel.Sub grow>
                    <AutoSizer>
                        {({ width, height }) => (
                            <Chart width={width} height={height} data={data} scale={scale} padding="auto" forceFit>
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
                                    name="calls"
                                    title={{
                                        autoRotate: true,
                                        textStyle: {
                                            fill: 'black',
                                            fontWeight: 'bold'
                                        }
                                    }} />
                                <Axis
                                    name="usec_per_call"
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
                                        width: '300px'
                                    }} />
                                <Geom
                                    type="line"
                                    position="timestamp*calls"
                                    size={2}
                                    color="#44a2fc"
                                    shape={'smooth'} />
                                <Geom
                                    type="line"
                                    position="timestamp*usec_per_call"
                                    size={2}
                                    color="#fad34b"
                                    shape={'smooth'} />
                                <Guide>
                                    {alerts.map(alert => {
                                        const html = `<span class="graph-alert" onClick="window.dispatchEvent(new CustomEvent('graph-alert', { detail: { alertId: '${alert.id}' } }));">Alert 1</span>`;

                                        return (
                                            <React.Fragment key={alert.id}>
                                                <Guide.Line
                                                    start={[moment(alert.id).unix(), 'min']}
                                                    end={[moment(alert.id).unix(), 'max']}
                                                    lineStyle={{
                                                        stroke: '#ff0000',
                                                        lineDash: [0, 2, 2],
                                                        lineWidth: 2
                                                    }} />
                                                <Guide.Html
                                                    position={[moment(alert.id).unix(), 'max']}
                                                    alignX="left"
                                                    alignY="top"
                                                    offsetX={10}
                                                    html={html} />
                                            </React.Fragment>
                                        );
                                    })}
                                </Guide>
                            </Chart>
                        )}
                    </AutoSizer>
                </Panel.Sub>
            )}
        </React.Fragment>
    );
}

GraphCommands.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default withProCheck(GraphCommands);