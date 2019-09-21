import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getSeveritySelector } from 'selectors/SeveritySelectors';

export function useSeverity(severityId) {
    const getSeverity = useMemo(getSeveritySelector, []);
    const severity = useSelector(state => getSeverity(state, severityId));
    return severity;
}