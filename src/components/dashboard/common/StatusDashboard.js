import React from 'react';
import { Col, Row } from 'antd';
import InstanceStatus from 'components/dashboard/common/InstanceStatus';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function StatusDashboard() {
    const instanceApi = useInstanceApi();

    return (
        <Row>
            {instanceApi.instances.map(instance => (
                <Col key={instance.id} span={8}>
                    <InstanceStatus instance={instance} />
                </Col>
            ))}
        </Row>
    );
}

export default StatusDashboard;