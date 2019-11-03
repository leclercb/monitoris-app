import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getInstanceAllInfoSelector, getInstanceLastInfoSelector, getInstanceStatusSelector } from 'selectors/InstanceSelectors';

export function useInstanceStateApi(instanceId) {
    const getInstanceStatus = useMemo(getInstanceStatusSelector, []);
    const status = useSelector(state => getInstanceStatus(state, instanceId));

    const getInstanceAllInfo = useMemo(getInstanceAllInfoSelector, []);
    const allInfo = useSelector(state => getInstanceAllInfo(state, instanceId));

    const getInstanceLastInfo = useMemo(getInstanceLastInfoSelector, []);
    const lastInfo = useSelector(state => getInstanceLastInfo(state, instanceId));

    return {
        status,
        allInfo,
        lastInfo
    };
}