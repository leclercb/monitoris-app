import { getAlertNotificationTypes } from 'data/DataAlertNotificationTypes';

export function useAlertNotificationTypeApi() {
    const alertnotificationtypes = getAlertNotificationTypes();

    return {
        alertnotificationtypes
    };
}