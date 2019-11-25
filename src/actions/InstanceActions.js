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
import { getErrorMessages } from 'utils/CloudUtils';
import { getRandomColor } from 'utils/ColorUtils';
import { parseRedisInfo } from 'utils/FormatUtils';

export function loadInstancesFromServer() {
    return loadObjectsFromServer('instances');
}

export function setInstances(instances) {
    return setObjects('instances', instances);
}

export function addInstance(instance, options = {}) {
    return addObject('instances', instance, options, {
        title: 'My Instance',
        color: getRandomColor(),
        type: 'proxy',
        enabled: true
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

export function getMonitoring(instanceId, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/monitoring`,
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get monitoring',
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

export function getAlerts(instanceId, start, end, silent = false) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/alerts`,
                    params: {
                        start,
                        end
                    },
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: 'Get instance alerts',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}

export function clearAlerts(instanceId, silent = false) {
    return async dispatch => {
        const processId = uuid();

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: 'Clear alert history',
            notify: true
        }));

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'POST',
                    url: `${getConfig().proxyUrl}/api/v1/instances/${instanceId}/alerts/clear`,
                    responseType: 'json'
                });

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
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
                    title: 'Get instance report',
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
                    title: 'Get instance reports',
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

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: 'Clear info history',
            notify: true
        }));

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

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));

            return result.data;
        } catch (error) {
            if (!silent) {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    error: getErrorMessages(error, true)
                }));
            }

            throw error;
        }
    };
}