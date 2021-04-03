import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useRedisFieldApi } from 'hooks/UseRedisFieldApi';

export function RedisFieldTitle(props) {
    const redisFieldApi = useRedisFieldApi();

    const field = redisFieldApi.fields.find(field => field.id === props.fieldId);

    return field ? <Icon icon="circle" color={field.color} text={field.title} /> : <span>&nbsp;</span>;
}

RedisFieldTitle.propTypes = {
    fieldId: PropTypes.string
};

export default RedisFieldTitle;