import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeverity, deleteSeverity, duplicateSeverity, updateSeverity } from 'actions/SeverityActions';
import { getSeverities } from 'selectors/SeveritySelectors';

export function useSeverityApi() {
    const dispatch = useDispatch();
    const severities = useSelector(getSeverities);

    const addSeverityCallback = useCallback(
        severity => dispatch(addSeverity(severity)),
        [dispatch]
    );

    const duplicateSeverityCallback = useCallback(
        severity => dispatch(duplicateSeverity(severity)),
        [dispatch]
    );

    const updateSeverityCallback = useCallback(
        severity => dispatch(updateSeverity(severity)),
        [dispatch]
    );

    const deleteSeverityCallback = useCallback(
        severityId => dispatch(deleteSeverity(severityId)),
        [dispatch]
    );

    return {
        severities,
        addSeverity: addSeverityCallback,
        duplicateSeverity: duplicateSeverityCallback,
        updateSeverity: updateSeverityCallback,
        deleteSeverity: deleteSeverityCallback
    };
}