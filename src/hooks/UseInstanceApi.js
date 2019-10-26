import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExplorerDb, setSelectedExplorerInstanceId, setSelectedInstanceId } from 'actions/AppActions';
import { addInstance, deleteInstance, duplicateInstance, executeCommand, getInfo, getStatus, updateInstance } from 'actions/InstanceActions';
import { getSelectedExplorerDb, getSelectedExplorerInstanceId, getSelectedInstanceId } from 'selectors/AppSelectors';
import { getInstances, getSelectedExplorerInstance, getSelectedInstance } from 'selectors/InstanceSelectors';

export function useInstanceApi() {
    const dispatch = useDispatch();
    const instances = useSelector(getInstances);

    const selectedInstanceId = useSelector(getSelectedInstanceId);
    const selectedExplorerInstanceId = useSelector(getSelectedExplorerInstanceId);
    const selectedExplorerDb = useSelector(getSelectedExplorerDb);

    const selectedInstance = useSelector(getSelectedInstance);
    const selectedExplorerInstance = useSelector(getSelectedExplorerInstance);

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

    const setSelectedInstanceIdCallback = useCallback(
        instanceId => dispatch(setSelectedInstanceId(instanceId)),
        [dispatch]
    );

    const setSelectedExplorerInstanceIdCallback = useCallback(
        instanceId => dispatch(setSelectedExplorerInstanceId(instanceId)),
        [dispatch]
    );

    const setSelectedExplorerDbCallback = useCallback(
        db => dispatch(setSelectedExplorerDb(db)),
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
        (instanceId, db, command, parameters) => dispatch(executeCommand(instanceId, db, command, parameters)),
        [dispatch]
    );

    return {
        instances,
        selectedInstanceId,
        selectedExplorerInstanceId,
        selectedExplorerDb,
        selectedInstance,
        selectedExplorerInstance,
        addInstance: addInstanceCallback,
        duplicateInstance: duplicateInstanceCallback,
        updateInstance: updateInstanceCallback,
        deleteInstance: deleteInstanceCallback,
        setSelectedInstanceId: setSelectedInstanceIdCallback,
        setSelectedExplorerInstanceId: setSelectedExplorerInstanceIdCallback,
        setSelectedExplorerDb: setSelectedExplorerDbCallback,
        getStatus: getStatusCallback,
        getInfo: getInfoCallback,
        executeCommand: executeCommandCallback
    };
}