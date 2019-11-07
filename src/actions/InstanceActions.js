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

export function getStatus(instanceId, silent = false) {
    return async dispatch => {
        const processId = uuid();

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

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get status',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}

export function getInfo(instanceId, silent = false) {
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
                type: 'SET_INFO',
                instanceId,
                timestamp: moment().toISOString(),
                info
            });

            return info;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get info',
                    error: getErrorMessages(error, true)
                }));
            }

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
                    title: 'Execute command',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}

export function getReport(instanceId, reportId, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/reports/${reportId}`,
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get report',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}

export function getReports(instanceId, start, end, attributeNames, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/reports`,
                    params: {
                        start,
                        end,
                        attributeNames: attributeNames.join(',')
                    },
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get reports',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}

export function clearReports(instanceId, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'POST',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/reports/clear`,
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Clear reports',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}