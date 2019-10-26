import { addColorsToArray } from 'utils/ColorUtils';

export function getAlertNotificationType(typeId) {
    return getAlertNotificationTypes().find(type => type.id === typeId);
}

export function getAlertNotificationTypes() {
    return addColorsToArray([
        {
            id: 'email',
            title: 'Email'
        },
        {
            id: 'http',
            title: 'Http(s)'
        },
        {
            id: 'sms',
            title: 'SMS'
        }
    ]);
}