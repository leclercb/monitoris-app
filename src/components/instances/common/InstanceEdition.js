import React, { useEffect, useState } from 'react';
import { Alert, Button, Divider, Form } from 'antd';
import PropTypes from 'prop-types';
import InstanceForm from 'components/instances/common/InstanceForm';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { InstancePropType } from 'proptypes/InstancePropTypes';

function InstanceEdition(props) {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();

    const [status, setStatus] = useState(null);

    useEffect(() => {
        const getStatus = async () => {
            const status = await instanceApi.getStatus();
            setStatus(status);
        };

        getStatus();
    }, [props.instance]);

    const goToExplorer = () => {
        instanceApi.setSelectedExplorerInstanceId(props.instance.id);
        appApi.setSelectedExplorerToolId('info');
        appApi.setSelectedView('explorer');
    };

    return (
        <React.Fragment>
            <InstanceForm
                instance={props.instance}
                updateInstance={props.updateInstance} />
            <Divider>Status</Divider>
            {status && status.connected && (
                <Alert
                    message="Connected"
                    description="The instance is currently connected."
                    type="success"
                    showIcon
                />
            )}
            {status && !status.connected && (
                <Alert
                    message="Disconnected"
                    description="The instance is currently disconnected."
                    type="warning"
                    showIcon
                />
            )}
            {!status && (
                <Alert
                    message="Missing Status"
                    description="The instance status has not been retrieved."
                    type="info"
                    showIcon
                />
            )}
            <Divider>Actions</Divider>
            <Button onClick={() => goToExplorer()} type="primary" block>
                Go to the explorer
            </Button>
        </React.Fragment>
    );
}

InstanceEdition.propTypes = {
    form: PropTypes.object.isRequired,
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default Form.create({ name: 'instance' })(InstanceEdition);