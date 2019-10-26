const readOnlySeverities = getSeverities().filter(severity => severity.readOnly);
const writableSeverities = getSeverities().filter(severity => !severity.readOnly);

export function getSeverity(severityId) {
    return getSeverities().find(severity => severity.id === severityId);
}

export function getSeverityIndex(severityId) {
    return getSeverities().findIndex(severity => severity.id === severityId) || 0;
}

export function getSeverities() {
    return [
        {
            id: 'norm',
            title: 'Normal',
            color: '#14b56a',
            notificationType: 'success',
            readOnly: true
        },
        {
            id: 'info',
            title: 'Info',
            color: '#165ad9',
            notificationType: 'info',
            readOnly: false
        },
        {
            id: 'warn',
            title: 'Warning',
            color: '#ebc634',
            notificationType: 'warning',
            readOnly: false
        },
        {
            id: 'crit',
            title: 'Critical',
            color: '#d2291f',
            notificationType: 'error',
            readOnly: false
        }
    ];
}

export function getReadOnlySeverities() {
    return readOnlySeverities;
}

export function getWritableSeverities() {
    return writableSeverities;
}