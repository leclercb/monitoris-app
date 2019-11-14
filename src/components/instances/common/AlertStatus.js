import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import AlertTitle from 'components/alerts/common/AlertTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import { useAlertApi } from 'hooks/UseAlertApi';

function AlertStatus({ status }) {
    const alertApi = useAlertApi();

    const columns = [
        {
            title: 'Alert',
            dataIndex: 'alertId',
            key: 'alertId',
            render: value => (<AlertTitle alertId={value} />) // eslint-disable-line react/display-name
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
            render: value => (<SeverityTitle severityId={value} />) // eslint-disable-line react/display-name
        }
    ];

    const dataSource = Object.keys((status ? status.alerts : {})).map(key => ({
        key,
        alertId: key,
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