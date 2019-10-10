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
            color: '#165ad9',
            notificationType: 'info'
        },
        {
            id: 'warn',
            title: 'Warning',
            color: '#ffec45',
            notificationType: 'warning'
        },
        {
            id: 'crit',
            title: 'Critical',
            color: '#d2291f',
            notificationType: 'error'
        }
    ];
}