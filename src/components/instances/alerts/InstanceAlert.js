import React from 'react';
import { Descriptions, Table } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import AlertTitle from 'components/alerts/common/AlertTitle';
import InstanceTitle from 'components/instances/common/InstanceTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import { getRedisField } from 'data/DataRedisFields';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getDateTimeFormat } from 'utils/SettingUtils';

export function InstanceAlert({ instanceAlert }) {
    const settingsApi = useSettingsApi();

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

    return (
        <React.Fragment>
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Date">
                    {moment(instanceAlert.id).format(getDateTimeFormat(settingsApi.settings))}
                </Descriptions.Item>
                <Descriptions.Item label="Alert">
                    <AlertTitle alertId={instanceAlert.alert} />
                </Descriptions.Item>
                <Descriptions.Item label="Instance">
                    <InstanceTitle instanceId={instanceAlert.instance} />
                </Descriptions.Item>
                <Descriptions.Item label="Severity">
                    <SeverityTitle severityId={instanceAlert.currSeverity} />
                </Descriptions.Item>
            </Descriptions>
            <Table columns={columns} dataSource={dataSource} pagination={false} size="small" style={{ marginTop: 20 }} />
        </React.Fragment>
    );
}

InstanceAlert.propTypes = {
    instanceAlert: PropTypes.object.isRequired
};

export default InstanceAlert;