import { getSeverities } from 'data/DataSeverities';

export function useSeverityApi() {
    const severities = getSeverities();

    return {
        severities
    };
}