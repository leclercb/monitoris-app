import { addColorsToArray } from 'utils/ColorUtils';

export function getAlertNotificationFields() {
    return addColorsToArray([
        {
            static: true,
            id: 'type',
            title: 'Type',
            type: 'alertNotificationType',
            editable: true
        },
        {
            static: true,
            id: 'destination',
            title: 'Destination',
            type: 'text',
            editable: true
        },
        {
            static: true,
            id: 'severities',
            title: 'Severities',
            type: 'severities',
            editable: true
        }
    ]);
}