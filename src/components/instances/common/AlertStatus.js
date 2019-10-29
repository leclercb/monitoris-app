import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import SeverityTitle from 'components/severities/SeverityTitle';
import { useAlertApi } from 'hooks/UseAlertApi';

function AlertStatus({ status }) {
    const alertApi = useAlertApi();

    const columns = [
        {
            title: 'Alert',
            dataIndex: 'alert.title',
            key: 'alert.title'
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
            render: value => { // eslint-disable-line react/display-name
                if (!value) {
                    return (<strong>Normal</strong>);
                }

                return (<SeverityTitle severityId={value} />);
            }
        }
    ];

    const dataSource = Object.keys((status ? status.alerts : {})).map(key => ({
        key,
        alert: alertApi.alerts.find(alert => alert.id === key),
        severity: status.alerts[key]
    }));

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false} />
    );
}

AlertStatus.propTypes = {
    status: PropTypes.object
};

export default AlertStatus;