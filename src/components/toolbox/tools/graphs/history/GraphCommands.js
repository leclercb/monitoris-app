import React, { useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
import { DatePicker, Empty, Select } from 'antd';
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
import { parseRedisSubString } from 'utils/FormatUtils';
import { getDateTimeFormat } from 'utils/SettingUtils';

function GraphCommands({ instanceId }) {
    const keys = [
        'auth',
        'client',
        'cluster',
        'command',
        'del',
        'eval',
        'exec',
        'get',
        'info',
        'set'
    ];

    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const [range, setRange] = useState([moment().subtract(1, 'day'), moment()]);
    const [reports, setReports] = useState([]);
    const [selectedFields, setSelectedFields] = useState(['cmdstat_info_calls']);

    const refresh = async () => {
        if (range && range[0] && range[1]) {
            const reports = await instanceApi.getReports(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString(),
                keys.map(key => `cmdstat_${key}`));

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

    const data = reports.map(report => {
        const item = {
            timestamp: moment(report.creationDate).unix()
        };

        Object.keys(report.info).forEach(key => {
            const cmdStat = parseRedisSubString(report.info[key]);
            item[`${key}_calls`] = Number.parseInt(cmdStat.calls);
        });

        return item;
    });

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
                    return `${moment(value * 1000).format('HH:mm:ss')}`;
                }

                return '';
            }
        },
        value: {
            alias: 'Calls',
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
                        placeholder="Categories"
                        onChange={value => setSelectedFields(value)}
                        style={{ minWidth: 300, marginLeft: 20 }}>
                        {keys.map(key => (
                            <Select.Option key={key} value={`cmdstat_${key}_calls`}>{key}</Select.Option>
                        ))}
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
                        </Chart>
                    )}
                </AutoSizer>
            </Panel.Sub>
        </React.Fragment>
    );
}

GraphCommands.propTypes = {
    instanceId: PropTypes.string.isRequired
};

export default withProCheck(GraphCommands);