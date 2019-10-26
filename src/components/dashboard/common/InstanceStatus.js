import React, { useEffect } from 'react';
import { Alert, Typography } from 'antd';
import PropTypes from 'prop-types';
import LeftRight from 'components/common/LeftRight';
import Icon from 'components/common/Icon';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';

function InstanceStatus({ instance }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instance.id);

    useEffect(() => {
        if (!instanceStateApi.status) {
            instanceApi.getStatus(instance.id);
        }
    }, [instance.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const refresh = () => {
        instanceApi.getStatus(instance.id);
    };

    let proxyAlert;
    let redisAlert;

    if (!instanceStateApi.status) {
        proxyAlert = <Alert message="The proxy status has not been retrieved" type="info" showIcon style={{ marginBottom: 10 }} />;
    } else if (instanceStateApi.status.connected) {
        proxyAlert = <Alert message="The proxy is currently connected" type="success" showIcon style={{ marginBottom: 10 }} />;
    } else {
        proxyAlert = <Alert message="The proxy is currently disconnected" type="warning" showIcon style={{ marginBottom: 10 }} />;
    }

    if (!instanceStateApi.status || (instanceStateApi.status && !instanceStateApi.status.lastStatus)) {
        redisAlert = <Alert message="The Redis server status has not been retrieved" type="info" showIcon />;
    } else if (instanceStateApi.status.lastStatus === 'ready') {
        redisAlert = <Alert message="The Redis server is currently connected" type="success" showIcon />;
    } else {
        redisAlert = <Alert message="The Redis server is currently disconnected" type="warning" showIcon />;
    }

    return (
        <div style={{ borderRadius: 5, border: '1px solid #cccccc', padding: 10, margin: 25 }}>
            <LeftRight right={(<Icon icon="sync-alt" onClick={refresh} />)}>
                <Typography.Title>{instance.title}</Typography.Title>
            </LeftRight>
            {proxyAlert}
            {redisAlert}
        </div>
    );
}

InstanceStatus.propTypes = {
    instance: PropTypes.object.isRequired
};

export default InstanceStatus;