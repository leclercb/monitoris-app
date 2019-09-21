import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getInstanceSelector } from 'selectors/InstanceSelectors';

export function useInstance(instanceId) {
    const getInstance = useMemo(getInstanceSelector, []);
    const instance = useSelector(state => getInstance(state, instanceId));
    return instance;
}