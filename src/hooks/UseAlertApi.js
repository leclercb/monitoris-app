import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, deleteAlert, duplicateAlert, updateAlert } from 'actions/AlertActions';
import { setSelectedAlertId } from 'actions/AppActions';
import { getAlerts, getSelectedAlert } from 'selectors/AlertSelectors';
import { getSelectedAlertId } from 'selectors/AppSelectors';

export function useAlertApi() {
    const dispatch = useDispatch();
    const alerts = useSelector(getAlerts);

    const selectedAlertId = useSelector(getSelectedAlertId);
    const selectedAlert = useSelector(getSelectedAlert);

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
        noteIds => dispatch(setSelectedAlertId(noteIds)),
        [dispatch]
    );

    return {
        alerts,
        selectedAlertId,
        selectedAlert,
        addAlert: addAlertCallback,
        duplicateAlert: duplicateAlertCallback,
        updateAlert: updateAlertCallback,
        deleteAlert: deleteAlertCallback,
        setSelectedAlertId: setSelectedAlertIdCallback
    };
}