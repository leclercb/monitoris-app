import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedInstanceId } from 'actions/AppActions';
import { addInstance, deleteInstance, duplicateInstance, updateInstance } from 'actions/InstanceActions';
import { getSelectedInstanceId } from 'selectors/AppSelectors';
import { getInstances, getSelectedInstance } from 'selectors/InstanceSelectors';

export function useInstanceApi() {
    const dispatch = useDispatch();
    const instances = useSelector(getInstances);

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

    const setSelectedInstanceIdCallback = useCallback(
        noteIds => dispatch(setSelectedInstanceId(noteIds)),
        [dispatch]
    );

    return {
        instances,
        selectedInstanceId,
        selectedInstance,
        addInstance: addInstanceCallback,
        duplicateInstance: duplicateInstanceCallback,
        updateInstance: updateInstanceCallback,
        deleteInstance: deleteInstanceCallback,
        setSelectedInstanceId: setSelectedInstanceIdCallback
    };
}