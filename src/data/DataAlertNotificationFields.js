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
            editable: true,
            rules: object => {
                switch (object.type) {
                    case 'email':
                        return [
                            {
                                type: 'email',
                                message: 'The destination email is invalid'
                            }
                        ];
                    case 'http':
                        return [
                            {
                                type: 'url',
                                message: 'The destination url is invalid'
                            }
                        ];
                    case 'sms':
                        return [
                            {
                                pattern: /^\+[0-9]{1,15}$/,
                                message: 'The destination phone number is invalid'
                            }
                        ];
                    default:
                        return [];
                }
            }
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