import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useInstanceApi } from 'hooks/UseInstanceApi';

export function InstancesTitle(props) {
    const instanceApi = useInstanceApi();
    const instances = instanceApi.instances.filter(instance => (props.instanceIds || []).includes(instance.id));

    return instances.map(instance => (
        <Icon
            key={instance.id}
            icon="circle"
            color={instance.color}
            text={instance.title}
            globalStyle={{ marginRight: 10 }} />
    ));
}

InstancesTitle.propTypes = {
    instanceIds: PropTypes.array
};

export default InstancesTitle;