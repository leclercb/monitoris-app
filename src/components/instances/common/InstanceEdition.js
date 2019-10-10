import React, { useEffect } from 'react';
import { Button, Col, Divider, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import AlertStatus from 'components/instances/common/AlertStatus';
import InstanceForm from 'components/instances/common/InstanceForm';
import ProxyStatus from 'components/instances/common/ProxyStatus';
import RedisStatus from 'components/instances/common/RedisStatus';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { InstancePropType } from 'proptypes/InstancePropTypes';

function InstanceEdition({ instance, updateInstance }) {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instance.id);

    const getStatus = async () => {
        await instanceApi.getStatus(instance.id);
    };

    const goToExplorer = () => {
        instanceApi.setSelectedExplorerInstanceId(instance.id);
        appApi.setSelectedExplorerToolId('info');
        appApi.setSelectedView('explorer');
    };

    useEffect(() => {
        if (!instanceStateApi.status) {
            getStatus();
        }
    }, [instance.id]);

    return (
        <React.Fragment>
            <InstanceForm
                instance={instance}
                updateInstance={updateInstance} />
            <Divider style={{ marginTop: 30 }}>Actions</Divider>
            <Row gutter={20}>
                <Col span={12}>
                    <Button onClick={() => getStatus()} type="dashed" style={{ height: 50 }} block>
                        <Icon icon="sync-alt" text="Refresh status" />
                    </Button>
                </Col>
                <Col span={12}>
                    <Button onClick={() => goToExplorer()} type="dashed" style={{ height: 50 }} block>
                        <Icon icon="search" text="Go to the explorer" />
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <Divider style={{ marginTop: 30 }}>Proxy Status</Divider>
                    <ProxyStatus status={instanceStateApi.status} />
                </Col>
                <Col span={12}>
                    <Divider style={{ marginTop: 30 }}>Redis Status</Divider>
                    <RedisStatus status={instanceStateApi.status} />
                </Col>
            </Row>
            <Divider style={{ marginTop: 30 }}>Alert Status</Divider>
            <AlertStatus status={instanceStateApi.status} />
        </React.Fragment>
    );
}

InstanceEdition.propTypes = {
    form: PropTypes.object.isRequired,
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default Form.create({ name: 'instance' })(InstanceEdition);