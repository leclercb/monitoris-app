import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useAlert } from 'hooks/UseAlert';

export function AlertTitle(props) {
    const alert = useAlert(props.alertId);
    return alert ? <Icon icon="circle" color={alert.color} text={alert.title} /> : <span>&nbsp;</span>;
}

AlertTitle.propTypes = {
    alertId: PropTypes.string
};

export default AlertTitle;