import { Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
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
import { getErrorMessages } from 'utils/CloudUtils';

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

export function executeCommand(instanceId, command) {
    return async dispatch => {
        const processId = uuid();

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: `Execute command on server`
        }));

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'POST',
                    url: `${getConfig().apiUrl}/v1/instances/${instanceId}/execute`,
                    data: {
                        command
                    },
                    responseType: 'json'
                });

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));

            return result.data;
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                error: getErrorMessages(error, true)
            }));

            throw error;
        }
    };
}