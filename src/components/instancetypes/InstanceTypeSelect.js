import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstanceTypeApi } from 'hooks/UseInstanceTypeApi';

export const InstanceTypeSelect = React.forwardRef(function InstanceTypeSelect(props, ref) {
    const instanceTypeApi = useInstanceTypeApi();
    const value = instanceTypeApi.types.find(type => type.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {instanceTypeApi.types.map(type => (
                <Select.Option key={type.id} value={type.id}>
                    <Icon icon={type.icon} color={type.color} text={type.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

InstanceTypeSelect.displayName = 'ForwardRefInstanceTypeSelect';

InstanceTypeSelect.propTypes = {
    value: PropTypes.string
};

export default InstanceTypeSelect;