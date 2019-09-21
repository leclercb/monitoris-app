export function getSeverity(severityId) {
    return getSeverities().find(severity => severity.id === severityId);
}

export function getSeverityIndex(severityId) {
    return getSeverities().findIndex(severity => severity.id === severityId) || 0;
}

export function getSeverities() {
    return [
        {
            id: 'info',
            title: 'Info',
            color: '#90a4ae'
        },
        {
            id: 'warn',
            title: 'Warning',
            color: '#8bc34a'
        },
        {
            id: 'critical',
            title: 'Critical',
            color: '#ffeb3b'
        }
    ];
}