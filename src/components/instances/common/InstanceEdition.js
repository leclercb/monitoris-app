import React, { useEffect, useState } from 'react';
import { Alert, Button, Divider, Form } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import InstanceForm from 'components/instances/common/InstanceForm';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { InstancePropType } from 'proptypes/InstancePropTypes';

function InstanceEdition(props) {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();

    const [status, setStatus] = useState(null);
    const [refreshDate, setRefreshDate] = useState('');

    const getStatus = async () => {
        try {
            const status = await instanceApi.getStatus(props.instance.id);
            setStatus(status);
            setRefreshDate(moment().toISOString());
        } catch (e) {
            setStatus(null);
            setRefreshDate('');
        }
    };

    const goToExplorer = () => {
        instanceApi.setSelectedExplorerInstanceId(props.instance.id);
        appApi.setSelectedExplorerToolId('info');
        appApi.setSelectedView('explorer');
    };

    useEffect(() => {
        getStatus();
    }, [props.instance.id]);

    return (
        <React.Fragment>
            <InstanceForm
                instance={props.instance}
                updateInstance={props.updateInstance} />
            <Divider>Status</Divider>
            {status && status.connected && (
                <Alert
                    message="Connected"
                    description={(
                        <div>
                            The instance is currently connected.
                            <br />
                            Refreshed on: {refreshDate}
                        </div>
                    )}
                    type="success"
                    showIcon
                />
            )}
            {status && !status.connected && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The instance is currently disconnected.
                            <br />
                            Refreshed on: {refreshDate}
                        </div>
                    )}
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
            <Button onClick={() => getStatus()} type="dashed" style={{ marginBottom: 20 }} block>
                Refresh status
            </Button>
            <Button onClick={() => goToExplorer()} type="dashed" block>
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