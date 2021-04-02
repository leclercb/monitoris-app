import React from 'react';
import { Checkbox, Table } from 'antd';
import PropTypes from 'prop-types';
import AlertTitle from 'components/alerts/common/AlertTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { formatDate } from 'utils/SettingUtils';

function AlertStatus({ status }) {
    const settingsApi = useSettingsApi();

    const dataSource = Object.keys((status ? status.alerts : {})).map(key => ({
        key,
        alertId: key,
        status: status.alerts[key]
    }));

    const columns = [
        {
            title: 'Alert',
            dataIndex: 'alertId',
            key: 'alertId',
            render: value => (<AlertTitle alertId={value} />) // eslint-disable-line react/display-name
        },
        {
            title: 'Severity',
            dataIndex: ['status', 'lastNotifiedSeverity'],
            key: 'severity.lastNotifiedSeverity',
            render: value => (<SeverityTitle severityId={value || 'norm'} />) // eslint-disable-line react/display-name
        }
    ];

    const historyColumns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            render: (value, record, index) => index + 1
        },
        {
            title: 'Creation date',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: value => formatDate(value, settingsApi.settings, true)
        },
        {
            title: 'Successful',
            dataIndex: 'successful',
            key: 'successful',
            render: value => (<Checkbox checked={value} disabled />) // eslint-disable-line react/display-name
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
            render: value => (<SeverityTitle severityId={value} />) // eslint-disable-line react/display-name
        },
        {
            title: 'Error',
            dataIndex: 'error',
            key: 'error'
        }
    ];

    /* eslint-disable react/display-name */
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            expandable={{
                expandedRowRender: record => (
                    <React.Fragment>
                        <span>Last notification sent on: {record.status.lastNotifiedSeverityTimestamp ? formatDate(record.status.lastNotifiedSeverityTimestamp, settingsApi.settings, true) : 'never'}</span>
                        <br />
                        <span>Severity history (since last notification):</span>
                        <Table
                            dataSource={(record.status.severityHistory || []).reverse()}
                            columns={historyColumns}
                            size="small"
                            style={{ marginTop: 10 }} />
                    </React.Fragment>
                )
            }} />
    );
    /* eslint-enable react/display-name */
}

AlertStatus.propTypes = {
    status: PropTypes.object
};

export default AlertStatus;