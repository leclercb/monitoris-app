import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstanceApi } from 'hooks/UseInstanceApi';

export const InstancesSelect = React.forwardRef(function InstancesSelect(props, ref) {
    const instanceApi = useInstanceApi();
    const value = (props.value || []).filter(instanceId => !!instanceApi.instances.find(instance => instance.id === instanceId));

    return (
        <Select ref={ref} allowClear={true} {...props} mode="multiple" value={value}>
            {instanceApi.instances.map(instance => (
                <Select.Option key={instance.id} value={instance.id}>
                    <Icon icon="circle" color={instance.color} text={instance.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

InstancesSelect.displayName = 'ForwardRefInstancesSelect';

InstancesSelect.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default InstancesSelect;