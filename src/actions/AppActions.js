import uuid from 'uuid/v4';
import { loadAlertsFromServer } from 'actions/AlertActions';
import { checkIsBusy, updateProcess } from 'actions/ThreadActions';
import { loadSettingsFromServer } from 'actions/SettingActions';
import { loadInstancesFromServer } from 'actions/InstanceActions';
import { merge } from 'utils/ObjectUtils';

export function loadData(options) {
    return loadDataFromServer(options);
}

export function loadDataFromServer(options) {
    return _loadDataFromServer(options);
}

export function _loadDataFromServer(options) {
    options = merge({
        skipSettings: false
    }, options || {});

    return async (dispatch, getState) => {
        await dispatch(checkIsBusy());

        const processId = uuid();

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: 'Load database',
            notify: true
        }));

        try {
            const promises = [
                dispatch(loadAlertsFromServer()),
                dispatch(loadInstancesFromServer())
            ];

            if (!options.skipSettings) {
                promises.unshift(dispatch(loadSettingsFromServer()));
            }

            await Promise.all(promises);

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));

            return getState();
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR'
            }));

            throw error;
        }
    };
}

export function setEditingCell(objectId, fieldId) {
    return async dispatch => {
        dispatch({
            type: 'SET_EDITING_CELL',
            objectId,
            fieldId
        });
    };
}

export function setSelectedAlertId(alertId) {
    return async dispatch => {
        dispatch({
            type: 'SET_SELECTED_ALERT_ID',
            alertId
        });
    };
}

export function setSelectedInstanceId(instanceId) {
    return async dispatch => {
        dispatch({
            type: 'SET_SELECTED_INSTANCE_ID',
            instanceId
        });
    };
}

export function setJoyrideOptions(options) {
    return async dispatch => {
        dispatch({
            type: 'SET_JOYRIDE_OPTIONS',
            ...options
        });
    };
}

export function setCategoryManagerOptions(options) {
    return async dispatch => {
        dispatch({
            type: 'SET_CATEGORY_MANAGER_OPTIONS',
            ...options
        });
    };
}

export function setSettingManagerOptions(options) {
    return async dispatch => {
        dispatch({
            type: 'SET_SETTING_MANAGER_OPTIONS',
            ...options
        });
    };
}