import React, { useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
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
import 'components/toolbox/tools/graphs/Graph.css';

function GraphConnections({ instanceId }) {
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
                ['connected_clients', 'blocked_clients']);

            setAlerts(alerts);
            setReports(reports);
        }
    };

    useEffect(() => {
        const handler = event => {
            const alert = alerts.find(alert => alert.id === event.detail.alertId);
            showGraphAlert(alert, alertApi.alerts, instanceApi.instances, settingsApi.settings);
        };

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
        connected_clients: Number.parseInt(report.info.connected_clients),
        blocked_clients: Number.parseInt(report.info.blocked_clients)
    }));

    const dv = new DataSet.DataView();

    dv.source(data).transform({
        type: 'fold',
        key: 'type',
        value: 'value',
        fields: [
            'connected_clients',
            'blocked_clients'
        ]
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
            alias: 'Clients',
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
                                    width: '200px'
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

GraphConnections.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default withProCheck(GraphConnections);