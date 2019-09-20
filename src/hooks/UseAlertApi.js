import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, deleteAlert, duplicateAlert, updateAlert } from 'actions/AlertActions';
import { getAlerts } from 'selectors/AlertSelectors';

export function useAlertApi() {
    const dispatch = useDispatch();
    const alerts = useSelector(getAlerts);

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

    return {
        alerts,
        addAlert: addAlertCallback,
        duplicateAlert: duplicateAlertCallback,
        updateAlert: updateAlertCallback,
        deleteAlert: deleteAlertCallback
    };
}