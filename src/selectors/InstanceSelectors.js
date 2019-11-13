import { createSelector } from 'reselect';
import { getSelectedInstanceId } from 'selectors/AppSelectors';
import { compareStrings } from 'utils/CompareUtils';

export const getInstances = state => state.instances;
export const getInstanceStates = state => state.instanceStates;

export const getSortedInstances = createSelector(
    getInstances,
    (instances) => {
        return instances.sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getInstanceSelector = () => createSelector(
    getInstances,
    (state, id) => id,
    (instances, id) => {
        return instances.find(instance => instance.id === id);
    }
);

export const getSelectedInstance = createSelector(
    getInstances,
    getSelectedInstanceId,
    (instances, instanceId) => {
        return instances.find(instance => instance.id === instanceId);
    }
);

export const getInstanceStatusSelector = () => createSelector(
    getInstanceStates,
    (state, id) => id,
    (instanceStates, id) => {
        const state = instanceStates[id];

        if (state) {
            return state.status;
        }

        return null;
    }
);

export const getInstanceInfoSelector = () => createSelector(
    getInstanceStates,
    (state, id) => id,
    (instanceStates, id) => {
        const state = instanceStates[id];

        if (state) {
            return state.info;
        }

        return null;
    }
);