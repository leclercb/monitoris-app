import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstanceTypeApi } from 'hooks/UseInstanceTypeApi';

export function InstanceTypeTitle(props) {
    const instanceTypeApi = useInstanceTypeApi();

    const type = instanceTypeApi.types.find(type => type.id === props.typeId);

    return type ? <Icon icon={type.icon} color={type.color} text={type.title} /> : <span>&nbsp;</span>;
}

InstanceTypeTitle.propTypes = {
    typeId: PropTypes.string
};

export default InstanceTypeTitle;