import React from 'react';
import { Divider, Form } from 'antd';
import PropTypes from 'prop-types';
import FilterConditionTree from 'components/filters/FilterConditionTree';
import AlertForm from 'components/alerts/common/AlertForm';
import NotificationTable from 'components/alerts/common/NotificationTable';
import { getAlertNotificationFields } from 'data/DataAlertNotificationFields';
import { AlertPropType } from 'proptypes/AlertPropTypes';
import { getRedisFields } from 'data/DataRedisFields';

function AlertEdition(props) {
    const onUpdateNotifications = async notifications => {
        await props.updateAlert({
            ...props.alert,
            notifications
        });
    };

    return (
        <React.Fragment>
            <AlertForm
                alert={props.alert}
                updateAlert={props.updateAlert} />
            <Divider>Filters</Divider>
            <FilterConditionTree
                filter={props.alert}
                context={{
                    fields: getRedisFields()
                }}
                updateFilter={props.updateAlert} />
            <Divider>Notifications</Divider>
            <NotificationTable
                notifications={props.alert.notifications || []}
                notificationFields={getAlertNotificationFields()}
                updateNotifications={onUpdateNotifications}
                testNotification={props.testNotification}
                orderSettingPrefix="alertNotificationColumnOrder_"
                widthSettingPrefix="alertNotificationColumnWidth_" />
        </React.Fragment>
    );
}

AlertEdition.propTypes = {
    form: PropTypes.object.isRequired,
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired,
    testNotification: PropTypes.func.isRequired
};

export default Form.create({ name: 'alert' })(AlertEdition);