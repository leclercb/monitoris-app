import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDb, setSelectedInstanceId } from 'actions/AppActions';
import { addInstance, deleteInstance, duplicateInstance, executeCommand, getInfo, getStatus, updateInstance } from 'actions/InstanceActions';
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
        instanceId => dispatch(getStatus(instanceId)),
        [dispatch]
    );

    const getInfoCallback = useCallback(
        instanceId => dispatch(getInfo(instanceId)),
        [dispatch]
    );

    const executeCommandCallback = useCallback(
        (instanceId, db, command, parameters, silent) => dispatch(executeCommand(instanceId, db, command, parameters, silent)),
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
        executeCommand: executeCommandCallback
    };
}