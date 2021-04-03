import React from 'react';
import { Descriptions, Table } from 'antd';
import PropTypes from 'prop-types';
import RedisFieldTitle from 'components/redisfield/RedisFieldTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getRedisField } from 'data/DataRedisFields';

export function AlertConditionResult({ alertConditionResult }) {
    const columns = [
        {
            title: 'Field',
            dataIndex: ['field', 'id'],
            key: 'field',
            render: value => (<RedisFieldTitle fieldId={value} />) // eslint-disable-line react/display-name
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        },
        {
            title: 'Severity',
            dataIndex: 'severity',
            key: 'severity',
            render: value => (<SeverityTitle severityId={value} />) // eslint-disable-line react/display-name
        }
    ];

    const dataSource = Object.keys(alertConditionResult.fields).map(key => {
        const alertField = alertConditionResult.fields[key];
        const redisField = getRedisField(key);

        return {
            field: redisField,
            value: alertField.value,
            severity: alertField.severity
        };
    });

    return (
        <React.Fragment>
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Severity">
                    <SeverityTitle severityId={alertConditionResult.severity} />
                </Descriptions.Item>
            </Descriptions>
            <Table
                rowKey={record => record.field.id}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size="small"
                style={{ marginTop: 20 }} />
        </React.Fragment>
    );
}

AlertConditionResult.propTypes = {
    alertConditionResult: PropTypes.object.isRequired
};

export default AlertConditionResult;