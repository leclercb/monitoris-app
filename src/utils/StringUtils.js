import moment from 'moment';

export function toString(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }

    return String(value);
}

export function toStringArray(value) {
    if (!value) {
        return '';
    }

    return value.join(', ');
}

export function toStringBoolean(value) {
    return toString(!!value);
}

export function toStringDate(value, format) {
    if (!value) {
        return '';
    }

    return moment(value).format(format);
}

export function toStringNumber(value, prefix = '', suffix = '') {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }

    return prefix + value + suffix;
}

export function toStringObject(value, objects) {
    const object = objects.find(object => object.id === value);
    return object ? object.title : '';
}

export function toStringObjects(value, objects) {
    return (value || []).map(v => toStringObject(v, objects)).join(', ');
}

export function toStringPassword(value) {
    return value.replace(/./g, '*');
}