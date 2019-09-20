import {
    addObject,
    deleteObject,
    duplicateObject,
    loadObjectsFromServer,
    setObjects,
    updateObject
} from 'actions/ObjectActions';

export function loadInstancesFromServer() {
    return loadObjectsFromServer('instances');
}

export function setInstances(instances) {
    return setObjects('instances', instances);
}

export function addInstance(instance, options = {}) {
    return addObject('instances', instance, options);
}

export function duplicateInstance(instance, options = {}) {
    return duplicateObject('instances', instance, options);
}

export function updateInstance(instance, options = {}) {
    return updateObject('instances', instance, options);
}

export function deleteInstance(instanceId, options = {}) {
    return deleteObject('instances', instanceId, options);
}