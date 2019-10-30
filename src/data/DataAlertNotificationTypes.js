export function getAlertNotificationType(typeId) {
    return getAlertNotificationTypes().find(type => type.id === typeId);
}

export function getAlertNotificationTypes() {
    return [
        {
            id: 'email',
            title: 'Email',
            color: '#0dbf8a',
            icon: 'at'
        },
        {
            id: 'http',
            title: 'Http(s)',
            color: '#0daabf',
            icon: 'paper-plane'
        },
        {
            id: 'sms',
            title: 'SMS',
            color: '#0d6fbf',
            icon: 'sms'
        }
    ];
}