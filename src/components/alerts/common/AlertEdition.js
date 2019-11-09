import React, { useEffect, useState } from 'react';
import { Alert, Divider } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import FilterConditionTree from 'components/filters/FilterConditionTree';
import AlertForm from 'components/alerts/common/AlertForm';
import NotificationTable from 'components/alerts/common/NotificationTable';
import { getAlertNotificationFields } from 'data/DataAlertNotificationFields';
import { getRedisFields } from 'data/DataRedisFields';
import { useInterval } from 'hooks/UseInterval';
import { AlertPropType } from 'proptypes/AlertPropTypes';

function AlertEdition({ alert, updateAlert, testNotification }) {
    const [seconds, setSeconds] = useState(-1);

    useEffect(() => {
        const s = moment().diff(moment(alert.updateDate), 'seconds');

        if (s < 300) {
            setSeconds(300 - s);
        }
    }, [alert]);

    useInterval(() => {
        if (seconds >= 0) {
            setSeconds(seconds - 1);
        }
    }, 5000);

    const onUpdateNotifications = async notifications => {
        await updateAlert({
            ...alert,
            notifications
        });
    };

    return (
        <React.Fragment>
            {seconds >= 0 && (
                <Alert
                    message={`The alert has been updated less than 5 minutes ago and is therefore not active yet. The updated alert will become active in ${moment.duration(seconds * 1000).humanize()}.`}
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }} />
            )}
            <AlertForm
                alert={alert}
                updateAlert={updateAlert} />
            <Divider>Filters</Divider>
            <FilterConditionTree
                filter={alert}
                context={{
                    fields: getRedisFields()
                }}
                updateFilter={updateAlert} />
            <Divider>Notifications</Divider>
            <NotificationTable
                notifications={alert.notifications || []}
                notificationFields={getAlertNotificationFields()}
                updateNotifications={onUpdateNotifications}
                testNotification={testNotification}
                orderSettingPrefix="alertNotificationColumnOrder_"
                widthSettingPrefix="alertNotificationColumnWidth_" />
        </React.Fragment>
    );
}

AlertEdition.propTypes = {
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired,
    testNotification: PropTypes.func.isRequired
};

export default AlertEdition;