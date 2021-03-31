import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, deleteAlert, duplicateAlert, loadNotificationLimits, testNotification, updateAlert } from 'actions/AlertActions';
import { setSelectedAlertId } from 'actions/AppActions';
import { getAlerts, getSelectedAlert } from 'selectors/AlertSelectors';
import { getSelectedAlertId } from 'selectors/AppSelectors';
import { getNotificationLimits } from 'selectors/NotificationSelectors';

export function useAlertApi() {
    const dispatch = useDispatch();
    const alerts = useSelector(getAlerts);

    const selectedAlertId = useSelector(getSelectedAlertId);
    const selectedAlert = useSelector(getSelectedAlert);
    const notificationLimits = useSelector(getNotificationLimits);

    const addAlertCallback = useCallback(
        alert => dispatch(addAlert(alert)),
        [dispatch]
    );

    const duplicateAlertCallback = useCallback(
        alert => dispatch(duplicateAlert(alert)),
        [dispatch]
    );

    const updateAlertCallback = useCallback(
        alert => dispatch(updateAlert(alert)),
        [dispatch]
    );

    const deleteAlertCallback = useCallback(
        alertId => dispatch(deleteAlert(alertId)),
        [dispatch]
    );

    const setSelectedAlertIdCallback = useCallback(
        alertId => dispatch(setSelectedAlertId(alertId)),
        [dispatch]
    );

    const loadNotificationLimitsCallback = useCallback(
        () => dispatch(loadNotificationLimits()),
        [dispatch]
    );

    const testNotificationCallback = useCallback(
        (type, destination) => dispatch(testNotification(type, destination)),
        [dispatch]
    );

    return {
        alerts,
        selectedAlertId,
        selectedAlert,
        notificationLimits,
        addAlert: addAlertCallback,
        duplicateAlert: duplicateAlertCallback,
        updateAlert: updateAlertCallback,
        deleteAlert: deleteAlertCallback,
        setSelectedAlertId: setSelectedAlertIdCallback,
        loadNotificationLimits: loadNotificationLimitsCallback,
        testNotification: testNotificationCallback
    };
}