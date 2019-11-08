import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
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
import { getDateTimeFormat } from 'utils/SettingUtils';

function GraphOperations({ instanceId }) {
    const alertApi = useAlertApi();
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [range, setRange] = useState([moment().subtract(1, 'day'), moment()]);
    const [alerts, setAlerts] = useState([]);
    const [reports, setReports] = useState([]);

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
                ['instantaneous_ops_per_sec']);

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
        instantaneous_ops_per_sec: Number.parseInt(report.info.instantaneous_ops_per_sec)
    }));

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
        instantaneous_ops_per_sec: {
            alias: 'Operations Per Sec',
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
                                name="instantaneous_ops_per_sec"
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
                                position="timestamp*instantaneous_ops_per_sec"
                                size={2}
                                color="#44a2fc"
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

GraphOperations.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default withProCheck(GraphOperations);