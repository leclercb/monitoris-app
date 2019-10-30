import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useRedisTypeApi } from 'hooks/UseRedisTypeApi';

export const RedisTypeSelect = React.forwardRef(function RedisTypeSelect(props, ref) {
    const redisTypeApi = useRedisTypeApi();
    const value = redisTypeApi.types.find(type => type.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {redisTypeApi.types.map(type => (
                <Select.Option key={type.id} value={type.id}>
                    <Icon icon={type.icon} color={type.color} text={type.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

RedisTypeSelect.displayName = 'ForwardRefRedisTypeSelect';

RedisTypeSelect.propTypes = {
    value: PropTypes.string
};

export default RedisTypeSelect;