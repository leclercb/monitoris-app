import {
    addObject,
    deleteObject,
    duplicateObject,
    loadObjectsFromServer,
    setObjects,
    updateObject
} from 'actions/ObjectActions';

export function loadSeveritiesFromServer() {
    return loadObjectsFromServer('severities');
}

export function setSeverities(severities) {
    return setObjects('severities', severities);
}

export function addSeverity(severity, options = {}) {
    return addObject('severities', severity, options);
}

export function duplicateSeverity(severity, options = {}) {
    return duplicateObject('severities', severity, options);
}

export function updateSeverity(severity, options = {}) {
    return updateObject('severities', severity, options);
}

export function deleteSeverity(severityId, options = {}) {
    return deleteObject('severities', severityId, options);
}