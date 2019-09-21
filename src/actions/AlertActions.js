import {
    addObject,
    deleteObject,
    duplicateObject,
    loadObjectsFromServer,
    setObjects,
    updateObject
} from 'actions/ObjectActions';

export function loadAlertsFromServer() {
    return loadObjectsFromServer('alerts');
}

export function setAlerts(alerts) {
    return setObjects('alerts', alerts);
}

export function addAlert(alert, options = {}) {
    return addObject('alerts', alert, options);
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