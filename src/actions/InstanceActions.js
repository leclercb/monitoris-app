import { Auth } from 'aws-amplify';
import moment from 'moment';
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
import Constants from 'constants/Constants';
import { getErrorMessages } from 'utils/CloudUtils';
import { parseRedisInfo } from 'utils/FormatUtils';

export function loadInstancesFromServer() {
    return loadObjectsFromServer('instances');
}

export function setInstances(instances) {
    return setObjects('instances', instances);
}

export function addInstance(instance, options = {}) {
    return addObject('instances', instance, options, {
        title: '',
        color: Constants.defaultObjectColor,
        type: 'proxy'
    });
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

export function getStatus(instanceId) {
    return async dispatch => {
        const processId = uuid();

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: 'Get status from server'
        }));

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/status`,
                    responseType: 'json'
                });

            await dispatch({
                type: 'SET_STATUS',
                instanceId,
                status: {
                    refreshDate: moment().toISOString(),
                    ...result.data
                }
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

export function getInfo(instanceId) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/info`,
                    responseType: 'text'
                });

            const info = parseRedisInfo(result.data);

            await dispatch({
                type: 'ADD_INFO',
                instanceId,
                timestamp: moment().toISOString(),
                info
            });

            return info;
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

export function executeCommand(instanceId, db, command, parameters, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'POST',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/execute`,
                    data: {
                        db,
                        command,
                        parameters
                    },
                    responseType: 'text'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Execute command on server',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}