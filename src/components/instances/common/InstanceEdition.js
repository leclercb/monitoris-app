import React, { useEffect } from 'react';
import { Alert, Button, Col, Divider, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import InstanceForm from 'components/instances/common/InstanceForm';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { InstancePropType } from 'proptypes/InstancePropTypes';

function InstanceEdition(props) {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(props.instance.id);

    const getStatus = async () => {
        await instanceApi.getStatus(props.instance.id);
    };

    const goToExplorer = () => {
        instanceApi.setSelectedExplorerInstanceId(props.instance.id);
        appApi.setSelectedExplorerToolId('info');
        appApi.setSelectedView('explorer');
    };

    useEffect(() => {
        if (!instanceStateApi.status) {
            getStatus();
        }
    }, [props.instance.id]);

    return (
        <React.Fragment>
            <InstanceForm
                instance={props.instance}
                updateInstance={props.updateInstance} />
            <Divider>Proxy Status</Divider>
            {instanceStateApi.status && instanceStateApi.status.connected && (
                <Alert
                    message="Connected"
                    description={(
                        <div>
                            The proxy is currently connected.
                            <br />
                            Refreshed on: {instanceStateApi.status.refreshDate}
                        </div>
                    )}
                    type="success"
                    showIcon
                />
            )}
            {instanceStateApi.status && !instanceStateApi.status.connected && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The proxy is currently disconnected.
                            <br />
                            Refreshed on: {instanceStateApi.status.refreshDate}
                        </div>
                    )}
                    type="warning"
                    showIcon
                />
            )}
            {!instanceStateApi.status && (
                <Alert
                    message="Missing Status"
                    description="The proxy status has not been retrieved."
                    type="info"
                    showIcon
                />
            )}
            <Divider>Redis Status</Divider>
            {instanceStateApi.status && instanceStateApi.status.lastStatus === 'ready' && (
                <Alert
                    message="Connected"
                    description={(
                        <div>
                            The Redis server is currently connected.
                            <br />
                            Refreshed on: {instanceStateApi.status.refreshDate}
                        </div>
                    )}
                    type="success"
                    showIcon
                />
            )}
            {instanceStateApi.status && instanceStateApi.status.lastStatus && instanceStateApi.status.lastStatus !== 'ready' && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The Redis server is currently disconnected ({instanceStateApi.status.lastStatus}).
                            <br />
                            Refreshed on: {instanceStateApi.status.refreshDate}
                        </div>
                    )}
                    type="warning"
                    showIcon
                />
            )}
            {(!instanceStateApi.status || (instanceStateApi.status && !instanceStateApi.status.lastStatus)) && (
                <Alert
                    message="Missing Status"
                    description="The Redis server status has not been retrieved."
                    type="info"
                    showIcon
                />
            )}
            <Divider>Actions</Divider>
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
        </React.Fragment>
    );
}

InstanceEdition.propTypes = {
    form: PropTypes.object.isRequired,
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default Form.create({ name: 'instance' })(InstanceEdition);