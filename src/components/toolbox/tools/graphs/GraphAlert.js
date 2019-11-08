import React from 'react';
import { Descriptions, Modal, Table } from 'antd';
import moment from 'moment';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getRedisField } from 'data/DataRedisFields';
import { getDateTimeFormat } from 'utils/SettingUtils';

export function showGraphAlert(instanceAlert, alerts, instances, settings) {
    const alert = alerts.find(alert => alert.id = instanceAlert.alert);
    const instance = instances.find(instance => instance.id = instanceAlert.instance);

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
            render: value => (<strong>{value}</strong>) // eslint-disable-line react/display-name
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

    const dataSource = Object.keys(instanceAlert.fields).map(key => {
        const alertField = instanceAlert.fields[key];
        const redisField = getRedisField(key);

        return {
            field: redisField.title,
            value: alertField.value,
            severity: alertField.severity
        };
    });

    Modal.info({
        title: 'Alert Details',
        content: (
            <React.Fragment>
                <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="Date">{moment(instanceAlert.id).format(getDateTimeFormat(settings))}</Descriptions.Item>
                    <Descriptions.Item label="Alert">{alert ? alert.title : 'Unknown'}</Descriptions.Item>
                    <Descriptions.Item label="Instance">{instance ? instance.title : 'Unknown'}</Descriptions.Item>
                    <Descriptions.Item label="Severity">
                        <SeverityTitle severityId={instanceAlert.currSeverity} />
                    </Descriptions.Item>
                </Descriptions>
                <Table columns={columns} dataSource={dataSource} pagination={false} size="small" style={{ marginTop: 20 }} />
            </React.Fragment>
        ),
        width: 800
    });
}