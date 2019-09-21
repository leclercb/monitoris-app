import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAlertSelector } from 'selectors/AlertSelectors';

export function useAlert(alertId) {
    const getAlert = useMemo(getAlertSelector, []);
    const alert = useSelector(state => getAlert(state, alertId));
    return alert;
}