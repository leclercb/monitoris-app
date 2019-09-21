import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { printAlerts, printInstances } from 'actions/PrintActions';

export function usePrintApi() {
    const dispatch = useDispatch();

    const printAlertsCallback = useCallback(
        alerts => dispatch(printAlerts(alerts)),
        [dispatch]
    );

    const printInstancesCallback = useCallback(
        instances => dispatch(printInstances(instances)),
        [dispatch]
    );

    return {
        printAlerts: printAlertsCallback,
        printInstances: printInstancesCallback
    };
}