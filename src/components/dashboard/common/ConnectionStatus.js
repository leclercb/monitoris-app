import React, { useEffect } from 'react';
import { Col, Empty, Row, Statistic, Typography } from 'antd';
import PropTypes from 'prop-types';
import LeftRight from 'components/common/LeftRight';
import Icon from 'components/common/Icon';
import DashboardItem from 'components/dashboard/common/DashboardItem';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';

function ConnectionStatus({ instance }) {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instance.id);

    useEffect(() => {
        if (!instanceStateApi.info) {
            instanceApi.getInfo(instance.id, true);
        }
    }, [instance.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const refresh = () => {
        instanceApi.getInfo(instance.id, true);
    };

    return (
        <DashboardItem>
            <LeftRight right={(<Icon icon="sync-alt" onClick={refresh} />)}>
                <Typography.Title level={3}>{instance.title}</Typography.Title>
            </LeftRight>
            {!instanceStateApi.info && (
                <Empty description="Data not available" />
            )}
            {!!instanceStateApi.info && (
                <Row>
                    <Col span={12}>
                        <Statistic title="Connected Clients" value={instanceStateApi.info ? instanceStateApi.info.connected_clients : '?'} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Connected Slaves" value={instanceStateApi.info ? instanceStateApi.info.connected_slaves : '?'} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Reject Connections" value={instanceStateApi.info ? instanceStateApi.info.rejected_connections : '?'} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Connections Received" value={instanceStateApi.info ? instanceStateApi.info.total_connections_received : '?'} />
                    </Col>
                </Row>
            )}
        </DashboardItem>
    );
}

ConnectionStatus.propTypes = {
    instance: PropTypes.object.isRequired
};

export default ConnectionStatus;