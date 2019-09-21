import moment from 'moment';

export function formatDate(date, settings, showTime = true) {
    if (!showTime) {
        return moment(date).format(settings.dateFormat);
    }

    return moment(date).format(`${settings.dateFormat} ${settings.timeFormat}`);
}

export function getAlertNotificationBackgroundColor(notification, index, settings) {
    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}