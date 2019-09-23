import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstanceApi } from 'hooks/UseInstanceApi';

export const InstanceSelect = React.forwardRef(function InstanceSelect(props, ref) {
    const instanceApi = useInstanceApi();
    const value = instanceApi.instances.find(instance => instance.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {instanceApi.instances.map(instance => (
                <Select.Option key={instance.id} value={instance.id}>
                    <Icon icon="circle" color={instance.color} text={instance.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

InstanceSelect.displayName = 'ForwardRefInstanceSelect';

InstanceSelect.propTypes = {
    value: PropTypes.string
};

export default InstanceSelect;