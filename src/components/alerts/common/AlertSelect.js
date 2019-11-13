import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useAlertApi } from 'hooks/UseAlertApi';

export const AlertSelect = React.forwardRef(function AlertSelect(props, ref) {
    const alertApi = useAlertApi();
    const value = alertApi.alerts.find(alert => alert.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {alertApi.alerts.map(alert => (
                <Select.Option key={alert.id} value={alert.id}>
                    <Icon icon="circle" color={alert.color} text={alert.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

AlertSelect.displayName = 'ForwardRefAlertSelect';

AlertSelect.propTypes = {
    value: PropTypes.string
};

export default AlertSelect;