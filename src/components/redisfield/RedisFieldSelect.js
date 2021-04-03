import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useRedisFieldApi } from 'hooks/UseRedisFieldApi';

export const RedisFieldSelect = React.forwardRef(function RedisFieldSelect(props, ref) {
    const redisFieldApi = useRedisFieldApi();
    const value = redisFieldApi.fields.find(field => field.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {redisFieldApi.fields.map(field => (
                <Select.Option key={field.id} value={field.id}>
                    <Icon icon="circle" color={field.color} text={field.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

RedisFieldSelect.displayName = 'ForwardRefRedisFieldSelect';

RedisFieldSelect.propTypes = {
    value: PropTypes.string
};

export default RedisFieldSelect;