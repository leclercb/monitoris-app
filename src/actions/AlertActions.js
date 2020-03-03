import { Auth } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import {
    addObject,
    deleteObject,
    duplicateObject,
    loadObjectsFromServer,
    setObjects,
    updateObject
} from 'actions/ObjectActions';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import { getConfig } from 'config/Config';
import { getRandomColor } from 'utils/ColorUtils';

export function loadAlertsFromServer() {
    return loadObjectsFromServer('alerts');
}

export function setAlerts(alerts) {
    return setObjects('alerts', alerts);
}

export function addAlert(alert, options = {}) {
    return addObject('alerts', alert, options, {
        title: 'My Alert',
        color: getRandomColor(),
        defaultSeverity: 'info',
        historySize: 10
    });
}

export function duplicateAlert(alert, options = {}) {
    return duplicateObject('alerts', alert, options);
}

export function updateAlert(alert, options = {}) {
    return updateObject('alerts', alert, options);
}

export function deleteAlert(alertId, options = {}) {
    return deleteObject('alerts', alertId, options);
}

export function testNotification(type, destination) {
    return async dispatch => {
        const processId = uuid();

        try {
            await sendRequest({
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                },
                method: 'POST',
                url: `${getConfig().proxyUrl}/api/v1/notifications/test`,
                responseType: 'json',
                data: {
                    type,
                    destination
                }
            });

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                title: 'Test nofication',
                error: error.toString()
            }));

            throw error;
        }
    };
}