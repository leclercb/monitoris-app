import moment from 'moment';

export function getDateTimeFormat(settings) {
    return `${settings.dateFormat} ${settings.timeFormat}`;
}

export function formatDate(date, settings, showTime = true) {
    if (!showTime) {
        return moment(date).format(settings.dateFormat);
    }

    return moment(date).format(getDateTimeFormat(settings));
}

export function getRowBackgroundColor(index, settings) {
    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}