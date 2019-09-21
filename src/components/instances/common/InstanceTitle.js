import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstance } from 'hooks/UseInstance';

export function InstanceTitle(props) {
    const instance = useInstance(props.instanceId);
    return instance ? <Icon icon="circle" color={instance.color} text={instance.title} /> : <span>&nbsp;</span>;
}

InstanceTitle.propTypes = {
    instanceId: PropTypes.string
};

export default InstanceTitle;