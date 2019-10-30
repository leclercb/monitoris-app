import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useAlertNotificationTypeApi } from 'hooks/UseAlertNotificationTypeApi';

export const AlertNotificationTypeSelect = React.forwardRef(function AlertNotificationTypeSelect(props, ref) {
    const alertNotificationTypeApi = useAlertNotificationTypeApi();
    const value = alertNotificationTypeApi.alertnotificationtypes.find(alertNotificationType => alertNotificationType.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {alertNotificationTypeApi.alertnotificationtypes.map(alertNotificationType => (
                <Select.Option key={alertNotificationType.id} value={alertNotificationType.id}>
                    <Icon icon={alertNotificationType.icon} color={alertNotificationType.color} text={alertNotificationType.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

AlertNotificationTypeSelect.displayName = 'ForwardRefAlertNotificationTypeSelect';

AlertNotificationTypeSelect.propTypes = {
    value: PropTypes.string
};

export default AlertNotificationTypeSelect;