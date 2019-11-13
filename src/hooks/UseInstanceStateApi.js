import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getInstanceInfoSelector, getInstanceStatusSelector } from 'selectors/InstanceSelectors';

export function useInstanceStateApi(instanceId) {
    const getInstanceStatus = useMemo(getInstanceStatusSelector, []);
    const status = useSelector(state => getInstanceStatus(state, instanceId));

    const getInstanceInfo = useMemo(getInstanceInfoSelector, []);
    const info = useSelector(state => getInstanceInfo(state, instanceId));

    return {
        status,
        info
    };
}