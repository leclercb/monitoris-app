import { createSelector } from 'reselect';
import { compareStrings } from 'utils/CompareUtils';

export const getSeverities = state => state.severities;

export const getSortedSeverities = createSelector(
    getSeverities,
    (severities) => {
        return severities.sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getSeveritySelector = () => createSelector(
    getSeverities,
    (state, id) => id,
    (severities, id) => {
        return severities.find(severity => severity.id === id);
    }
);