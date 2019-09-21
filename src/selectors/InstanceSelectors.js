import { createSelector } from 'reselect';
import { getSelectedInstanceId } from 'selectors/AppSelectors';
import { compareStrings } from 'utils/CompareUtils';

export const getInstances = state => state.instances;

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
    (instances, selectedInstanceId) => {
        return instances.find(instance => instance.id === selectedInstanceId);
    }
);