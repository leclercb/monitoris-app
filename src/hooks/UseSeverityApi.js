import { getReadOnlySeverities, getSeverities, getWritableSeverities } from 'data/DataSeverities';

export function useSeverityApi() {
    const severities = getSeverities();
    const readOnlySeverities = getReadOnlySeverities();
    const writableSeverities = getWritableSeverities();

    return {
        severities,
        readOnlySeverities,
        writableSeverities
    };
}