import React, { useEffect, useState } from 'react';
import { DatePicker, Spin } from 'antd';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import HistoryGuide from 'components/graphs/graphs/history/HistoryGuide';
import { getConfig } from 'config/Config';
import withProCheck from 'containers/WithProCheck';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getDateTimeFormat, getTimeFormat } from 'utils/SettingUtils';

function GraphOperations({ instanceId }) {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState([moment().subtract(1, 'hour'), moment()]);
    const [alerts, setAlerts] = useState([]);
    const [reports, setReports] = useState([]);

    const refresh = async () => {
        if (range && range[0] && range[1]) {
            setLoading(true);

            try {
                const alerts = await instanceApi.getAlerts(
                    instanceId,
                    range[0].toISOString(),
                    range[1].toISOString());

                const reports = await instanceApi.getReports(
                    instanceId,
                    range[0].toISOString(),
                    range[1].toISOString(),
                    ['instantaneous_ops_per_sec']);

                alerts.forEach(alert => alert.instance = instanceId);

                setAlerts(alerts);
                setReports(reports);
            } finally {
                setLoading(false);
            }
        }
    };

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
                    <Spin spinning={loading}>
                        <DatePicker.RangePicker
                            value={range}
                            onChange={setRange}
                            allowClear={false}
                            disabledDate={current => {
                                return current && (
                                    current.isBefore(moment().subtract(getConfig().instanceReportTtl, 'day')) ||
                                    current.isAfter(moment()));
                            }}
                            showTime={{
                                format: getTimeFormat(settingsApi.settings, { hideSeconds: true }),
                                hideDisabledOptions: true,
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                            }}
                            format={getDateTimeFormat(settingsApi.settings, { hideSeconds: true })} />
                        <PromiseButton onClick={refresh} style={{ marginLeft: 10 }}>
                            <Icon icon="sync-alt" text="Query" />
                        </PromiseButton>
                    </Spin>
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
                            <HistoryGuide alerts={alerts} />
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