import React from 'react';
import { Col, Row } from 'antd';
import ConnectionStatus from 'components/dashboard/common/ConnectionStatus';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function ConnectionsDashboard() {
    const instanceApi = useInstanceApi();

    return (
        <Row>
            {instanceApi.instances.map(instance => (
                <Col key={instance.id} span={8}>
                    <ConnectionStatus instance={instance} />
                </Col>
            ))}
        </Row>
    );
}

export default ConnectionsDashboard;