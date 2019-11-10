import moment from 'moment';

export function getTimeFormat(settings, options = {}) {
    let format = settings.timeFormat;

    if (options && options.hideSeconds) {
        format = format.replace(':ss', '');
    }

    return format;
}

export function getDateTimeFormat(settings, options = {}) {
    return `${settings.dateFormat} ${getTimeFormat(settings, options)}`;
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