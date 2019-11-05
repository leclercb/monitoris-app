import React, { useEffect } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import LeftRight from 'components/common/LeftRight';
import Icon from 'components/common/Icon';
import DashboardItem from 'components/dashboard/common/DashboardItem';
import ProxyStatus from 'components/instances/common/ProxyStatus';
import RedisStatus from 'components/instances/common/RedisStatus';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';

function InstanceStatus({ instance }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instance.id);

    useEffect(() => {
        if (!instanceStateApi.status) {
            instanceApi.getStatus(instance.id, true);
        }
    }, [instance.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const refresh = () => {
        instanceApi.getStatus(instance.id, true);
    };

    return (
        <DashboardItem>
            <LeftRight right={(<Icon icon="sync-alt" onClick={refresh} />)}>
                <Typography.Title level={3}>{instance.title}</Typography.Title>
            </LeftRight>
            {instance.type === 'proxy' && (
                <div style={{ marginBottom: 10 }}>
                    <ProxyStatus status={instanceStateApi.status} />
                </div>
            )}
            <RedisStatus status={instanceStateApi.status} />
        </DashboardItem>
    );
}

InstanceStatus.propTypes = {
    instance: PropTypes.object.isRequired
};

export default InstanceStatus;