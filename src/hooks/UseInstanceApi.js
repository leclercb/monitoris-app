import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDb, setSelectedInstanceId } from 'actions/AppActions';
import {
    addInstance,
    clearReports,
    deleteInstance,
    duplicateInstance,
    executeCommand,
    getInfo,
    getReport,
    getReports,
    getStatus,
    updateInstance
} from 'actions/InstanceActions';
import { getSelectedDb, getSelectedInstanceId } from 'selectors/AppSelectors';
import { getInstances, getSelectedInstance } from 'selectors/InstanceSelectors';

export function useInstanceApi() {
    const dispatch = useDispatch();
    const instances = useSelector(getInstances);

    const selectedDb = useSelector(getSelectedDb);
    const selectedInstanceId = useSelector(getSelectedInstanceId);

    const selectedInstance = useSelector(getSelectedInstance);

    const addInstanceCallback = useCallback(
        instance => dispatch(addInstance(instance)),
        [dispatch]
    );

    const duplicateInstanceCallback = useCallback(
        instance => dispatch(duplicateInstance(instance)),
        [dispatch]
    );

    const updateInstanceCallback = useCallback(
        instance => dispatch(updateInstance(instance)),
        [dispatch]
    );

    const deleteInstanceCallback = useCallback(
        instanceId => dispatch(deleteInstance(instanceId)),
        [dispatch]
    );

    const setSelectedDbCallback = useCallback(
        db => dispatch(setSelectedDb(db)),
        [dispatch]
    );

    const setSelectedInstanceIdCallback = useCallback(
        instanceId => dispatch(setSelectedInstanceId(instanceId)),
        [dispatch]
    );

    const getStatusCallback = useCallback(
        (instanceId, silent) => dispatch(getStatus(instanceId, silent)),
        [dispatch]
    );

    const getInfoCallback = useCallback(
        (instanceId, silent) => dispatch(getInfo(instanceId, silent)),
        [dispatch]
    );

    const executeCommandCallback = useCallback(
        (instanceId, db, command, parameters, silent) => dispatch(executeCommand(instanceId, db, command, parameters, silent)),
        [dispatch]
    );

    const getReportCallback = useCallback(
        (instanceId, reportId, silent) => dispatch(getReport(instanceId, reportId, silent)),
        [dispatch]
    );

    const getReportsCallback = useCallback(
        (instanceId, start, end, attributeNames, silent) => dispatch(getReports(instanceId, start, end, attributeNames, silent)),
        [dispatch]
    );

    const clearReportsCallback = useCallback(
        (instanceId, silent) => dispatch(clearReports(instanceId, silent)),
        [dispatch]
    );

    return {
        instances,
        selectedDb,
        selectedInstanceId,
        selectedInstance,
        addInstance: addInstanceCallback,
        duplicateInstance: duplicateInstanceCallback,
        updateInstance: updateInstanceCallback,
        deleteInstance: deleteInstanceCallback,
        setSelectedDb: setSelectedDbCallback,
        setSelectedInstanceId: setSelectedInstanceIdCallback,
        getStatus: getStatusCallback,
        getInfo: getInfoCallback,
        executeCommand: executeCommandCallback,
        getReport: getReportCallback,
        getReports: getReportsCallback,
        clearReports: clearReportsCallback
    };
}