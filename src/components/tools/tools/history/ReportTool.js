import React, { useEffect, useState } from 'react';
import { DatePicker, Empty, Input, List, Spin, Table } from 'antd';
import moment from 'moment';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import { getConfig } from 'config/Config';
import withProCheck from 'containers/WithProCheck';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { formatDate, getDateTimeFormat, getTimeFormat } from 'utils/SettingUtils';

function ReportTool() {
    const instanceApi = useInstanceApi();
    const instanceId = instanceApi.selectedInstanceId;
    const settingsApi = useSettingsApi();

    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [range, setRange] = useState([moment().subtract(1, 'hour'), moment()]);
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState({ info: {} });

    const refresh = async () => {
        if (range && range[0] && range[1]) {
            setLoading(true);

            try {
                const reports = await instanceApi.getReports(
                    instanceId,
                    range[0].toISOString(),
                    range[1].toISOString(),
                    []);

                setReports(reports);
            } finally {
                setLoading(false);
            }
        }
    };

    const onSelectReport = async reportId => {
        setLoading(true);

        try {
            const report = await instanceApi.getReport(instanceId, reportId);
            setSelectedReport(report);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: key => <strong>{key}</strong> // eslint-disable-line react/display-name
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        }
    ];

    const dataSource = Object.keys(selectedReport ? selectedReport.info : {}).sort().filter(key => key.includes(searchValue)).map(key => ({
        key,
        value: selectedReport.info[key]
    }));

    return (
        <React.Fragment>
            <Panel.Sub>
                <Panel.Standard>
                    <Spin spinning={loading}>
                        <Input.Search
                            allowClear={true}
                            onChange={event => setSearchValue(event.target.value)}
                            onSearch={value => setSearchValue(value)}
                            style={{
                                width: 400,
                                marginRight: 10
                            }} />
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
            <Panel.Sub grow flexDirection="row">
                {!selectedReport && (
                    <Empty description="No data to display" />
                )}
                {selectedReport && (
                    <React.Fragment>
                        <Panel.Standard>
                            <List
                                size="small"
                                bordered={true}
                                loading={loading}
                                dataSource={reports}
                                renderItem={report => (
                                    <List.Item
                                        onClick={() => onSelectReport(report.id)}
                                        className={report.id === (selectedReport ? selectedReport.id : null) ? 'selected-list-item' : null}>
                                        {formatDate(report.id, settingsApi.settings)}
                                    </List.Item>
                                )}
                                style={{ width: 200, marginRight: 25 }} />
                        </Panel.Standard>
                        <Panel.Grow>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                                size="small" />
                        </Panel.Grow>
                    </React.Fragment>
                )}
            </Panel.Sub>
        </React.Fragment>
    );
}

export default withProCheck(ReportTool);