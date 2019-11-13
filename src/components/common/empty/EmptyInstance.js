import React from 'react';
import { Empty } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import PromiseButton from 'components/common/PromiseButton';
import InstanceSelect from 'components/instances/common/InstanceSelect';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function EmptyInstance({ hideSelect }) {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();

    if (instanceApi.instances.length === 0) {
        return (
            <Empty description="You don't have any instance yet">
                <PromiseButton onClick={async () => {
                    const instance = await instanceApi.addInstance({ type: 'direct' });
                    await instanceApi.setSelectedInstanceId(instance.id);
                    await appApi.setSelectedView('instances');
                }}>
                    <Icon icon="plus" text="Add your first instance" />
                </PromiseButton>
            </Empty>
        );
    }

    return (
        <Empty description="Please select an instance">
            {!hideSelect && (
                <InstanceSelect
                    value={instanceApi.selectedInstanceId}
                    onChange={value => instanceApi.setSelectedInstanceId(value)}
                    placeholder="Select an instance..."
                    style={{ width: 300 }} />
            )}
        </Empty>
    );
}

EmptyInstance.propTypes = {
    hideSelect: PropTypes.bool
};

export default EmptyInstance;