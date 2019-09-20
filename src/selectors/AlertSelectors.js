import { createSelector } from 'reselect';
import { compareStrings } from 'utils/CompareUtils';

export const getAlerts = state => state.alerts;

export const getSortedAlerts = createSelector(
    getAlerts,
    (alerts) => {
        return alerts.sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getAlertSelector = () => createSelector(
    getAlerts,
    (state, id) => id,
    (alerts, id) => {
        return alerts.find(alert => alert.id === id);
    }
);