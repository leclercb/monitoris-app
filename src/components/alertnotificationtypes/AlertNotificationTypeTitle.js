import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useAlertNotificationTypeApi } from 'hooks/UseAlertNotificationTypeApi';

export function AlertNotificationTypeTitle(props) {
    const alertNotificationTypeApi = useAlertNotificationTypeApi();

    const alertNotificationType = alertNotificationTypeApi.alertnotificationtypes.find(alertNotificationType => alertNotificationType.id === props.alertNotificationTypeId);

    return alertNotificationType ? <Icon icon="circle" color={alertNotificationType.color} text={alertNotificationType.title} /> : <span>&nbsp;</span>;
}

AlertNotificationTypeTitle.propTypes = {
    alertNotificationTypeId: PropTypes.string
};

export default AlertNotificationTypeTitle;