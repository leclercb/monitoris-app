import React, { useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
import { DatePicker, Select } from 'antd';
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
import { getHumanFileSize } from 'utils/FileUtils';
import { getDateTimeFormat } from 'utils/SettingUtils';

function GraphMemory({ instanceId }) {
    const alertApi = useAlertApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [range, setRange] = useState([moment().subtract(1, 'day'), moment()]);
    const [alerts, setAlerts] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedFields, setSelectedFields] = useState([
        'used_memory',
        'used_memory_dataset',
        'used_memory_lua',
        'used_memory_overhead',
        'used_memory_peak',
        'used_memory_rss',
        'used_memory_scripts',
        'used_memory_startup'
    ]);

    const refresh = async () => {
        if (range && range[0] && range[1]) {
            const alerts = await instanceApi.getAlerts(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString());

            const reports = await instanceApi.getReports(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString(),
                [
                    'used_memory',
                    'used_memory_dataset',
                    'used_memory_lua',
                    'used_memory_overhead',
                    'used_memory_peak',
                    'used_memory_rss',
                    'used_memory_scripts',
                    'used_memory_startup'
                ]);

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
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    const data = reports.map(report => ({
        timestamp: moment(report.id).unix(),
        used_memory: Number.parseInt(report.info.used_memory),
        used_memory_dataset: Number.parseInt(report.info.used_memory_dataset),
        used_memory_lua: Number.parseInt(report.info.used_memory_lua),
        used_memory_overhead: Number.parseInt(report.info.used_memory_overhead),
        used_memory_peak: Number.parseInt(report.info.used_memory_peak),
        used_memory_rss: Number.parseInt(report.info.used_memory_rss),
        used_memory_scripts: Number.parseInt(report.info.used_memory_scripts),
        used_memory_startup: Number.parseInt(report.info.used_memory_startup)
    }));

    const dv = new DataSet.DataView();

    dv.source(data).transform({
        type: 'fold',
        key: 'type',
        value: 'value',
        fields: selectedFields
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
        value: {
            alias: 'Memory',
            formatter: value => getHumanFileSize(value),
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
                        mode="multiple"
                        value={selectedFields}
                        showSearch={true}
                        placeholder="Categories"
                        onChange={value => setSelectedFields(value)}
                        style={{ minWidth: 300, marginLeft: 20 }}>
                        <Select.Option value="used_memory">Used</Select.Option>
                        <Select.Option value="used_memory_dataset">Dataset</Select.Option>
                        <Select.Option value="used_memory_lua">LUA</Select.Option>
                        <Select.Option value="used_memory_overhead">Overhead</Select.Option>
                        <Select.Option value="used_memory_peak">Peak</Select.Option>
                        <Select.Option value="used_memory_rss">RSS</Select.Option>
                        <Select.Option value="used_memory_scripts">Scripts</Select.Option>
                        <Select.Option value="used_memory_startup">Startup</Select.Option>
                    </Select>
                </Panel.Standard>
            </Panel.Sub>
            <Panel.Sub grow>
                <AutoSizer>
                    {({ width, height }) => (
                        <Chart width={width} height={height} data={dv} scale={scale} padding="auto" forceFit>
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
                                name="value"
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
                                position="timestamp*value"
                                size={2}
                                color="type"
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
        </React.Fragment>
    );
}

GraphMemory.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default withProCheck(GraphMemory);