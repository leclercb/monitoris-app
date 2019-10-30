import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useRedisTypeApi } from 'hooks/UseRedisTypeApi';

export function RedisTypeTitle(props) {
    const redisTypeApi = useRedisTypeApi();

    const type = redisTypeApi.types.find(type => type.id === props.typeId);

    return type ? <Icon icon={type.icon} color={type.color} text={type.title} /> : <span>&nbsp;</span>;
}

RedisTypeTitle.propTypes = {
    typeId: PropTypes.string
};

export default RedisTypeTitle;