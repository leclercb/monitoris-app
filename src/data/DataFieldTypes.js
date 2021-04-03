import moment from 'moment';
import { getAlertNotificationTypes } from 'data/DataAlertNotificationTypes';
import { getInstanceTypes } from 'data/DataInstanceTypes';
import { getRedisFields } from 'data/DataRedisFields';
import { getRedisTypes } from 'data/DataRedisTypes';
import { getSeverities } from 'data/DataSeverities';
import { getAlerts } from 'selectors/AlertSelectors';
import { getInstances } from 'selectors/InstanceSelectors';
import {
    compareBooleans,
    compareDates,
    compareNumbers,
    compareObjects,
    compareStrings
} from 'utils/CompareUtils';
import {
    toString,
    toStringBoolean,
    toStringDate,
    toStringFileSize,
    toStringNumber,
    toStringObject,
    toStringObjects,
    toStringPassword
} from 'utils/StringUtils';

export function getFieldTypes() {
    return [
        'alert',
        'alertNotificationType',
        'boolean',
        'color',
        'date',
        'dateTime',
        'fileSize',
        'instance',
        'instances',
        'instanceType',
        'number',
        'password',
        'redisField',
        'redisType',
        'select',
        'severities',
        'severity',
        'star',
        'syntax',
        'text',
        'textarea'
    ];
}

export function getWidthForType(type) {
    return getFieldType(type).width;
}

export function isAlwaysInEditionForType(type) {
    return getFieldType(type).alwaysInEdition;
}

export function getValuePropNameForType(type) {
    return getFieldType(type).valuePropName;
}

export function getCompareForType(type, a, b, state) {
    return getFieldType(type).compare(a, b, state);
}

export function getToStringForType(type, options, value, state) {
    return getFieldType(type, options).toString(value, state);
}

export function getFieldType(type, options) { // eslint-disable-line no-unused-vars
    switch (type) {
        case 'alert': {
            return {
                title: 'Alert',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b, state) => compareObjects(a, b, getAlerts(state)),
                toString: (value, state) => toStringObject(value, getAlerts(state)),
                options: []
            };
        }
        case 'alertNotificationType': {
            return {
                title: 'Alert Notification Type',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getAlertNotificationTypes()),
                toString: value => toStringObject(value, getAlertNotificationTypes()),
                options: []
            };
        }
        case 'boolean': {
            return {
                title: 'Boolean',
                allowCreation: true,
                width: 100,
                alwaysInEdition: true,
                valuePropName: 'checked',
                compare: (a, b) => compareBooleans(a, b),
                toString: value => toStringBoolean(value),
                options: []
            };
        }
        case 'color': {
            return {
                title: 'Color',
                allowCreation: true,
                width: 100,
                alwaysInEdition: false,
                valuePropName: 'color',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                options: []
            };
        }
        case 'date': {
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';

            return {
                title: 'Date',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => {
                    if (Number.isInteger(a)) {
                        a = moment().add(Number.parseInt(a), 'day').toISOString();
                    }

                    if (Number.isInteger(b)) {
                        b = moment().add(Number.parseInt(b), 'day').toISOString();
                    }

                    return compareDates(a, b, false);
                },
                toString: value => {
                    if (Number.isInteger(value)) {
                        value = moment().add(Number.parseInt(value), 'day').toISOString();
                    }

                    return toStringDate(value, dateFormat);
                },
                options: [
                    {
                        id: 'dateFormat',
                        title: 'Date format',
                        type: 'text'
                    }
                ]
            };
        }
        case 'dateTime': {
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';
            const timeFormat = options && options.timeFormat ? options.timeFormat : 'HH:mm';

            return {
                title: 'Date time',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => {
                    if (Number.isInteger(a)) {
                        a = moment().add(Number.parseInt(a), 'day').toISOString();
                    }

                    if (Number.isInteger(b)) {
                        b = moment().add(Number.parseInt(b), 'day').toISOString();
                    }

                    return compareDates(a, b, true);
                },
                toString: value => {
                    if (Number.isInteger(value)) {
                        value = moment().add(Number.parseInt(value), 'day').toISOString();
                    }

                    return toStringDate(value, `${dateFormat} ${timeFormat}`);
                },
                options: [
                    {
                        id: 'dateFormat',
                        title: 'Date format',
                        type: 'text'
                    },
                    {
                        id: 'timeFormat',
                        title: 'Time format',
                        type: 'text'
                    }
                ]
            };
        }
        case 'fileSize': {
            return {
                title: 'File Size',
                allowCreation: true,
                width: 150,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareNumbers(a, b),
                toString: value => toStringFileSize(value),
                options: []
            };
        }
        case 'instance': {
            return {
                title: 'Instance',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b, state) => compareObjects(a, b, getInstances(state)),
                toString: (value, state) => toStringObject(value, getInstances(state)),
                options: []
            };
        }
        case 'instances': {
            return {
                title: 'Instances',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: () => 0,
                toString: (value, state) => toStringObjects(value, getInstances(state)),
                options: []
            };
        }
        case 'instanceType': {
            return {
                title: 'Instance Type',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getInstanceTypes()),
                toString: value => toStringObject(value, getInstanceTypes()),
                options: []
            };
        }
        case 'number': {
            return {
                title: 'Number',
                allowCreation: true,
                width: 150,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareNumbers(a, b),
                toString: value => toStringNumber(value),
                options: [
                    {
                        id: 'min',
                        title: 'Minimum',
                        type: 'number'
                    },
                    {
                        id: 'max',
                        title: 'Maximum',
                        type: 'number'
                    }
                ]
            };
        }
        case 'password': {
            return {
                title: 'Password',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toStringPassword(value),
                options: []
            };
        }
        case 'redisField': {
            return {
                title: 'Redis Field',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getRedisFields()),
                toString: (value) => toStringObject(value, getRedisFields()),
                options: []
            };
        }
        case 'redisType': {
            return {
                title: 'Redis Type',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getRedisTypes()),
                toString: value => toStringObject(value, getRedisTypes()),
                options: []
            };
        }
        case 'select': {
            return {
                title: 'Select',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                options: [
                    {
                        id: 'values',
                        title: 'Values',
                        type: 'selectTags'
                    }
                ]
            };
        }
        case 'severities': {
            return {
                title: 'Severities',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: () => 0,
                toString: value => toStringObjects(value, getSeverities()),
                options: []
            };
        }
        case 'severity': {
            return {
                title: 'Severity',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getSeverities()),
                toString: value => toStringObject(value, getSeverities()),
                options: []
            };
        }
        case 'star': {
            return {
                title: 'Star',
                allowCreation: true,
                width: 100,
                alwaysInEdition: true,
                valuePropName: 'checked',
                compare: (a, b) => compareBooleans(a, b),
                toString: value => toStringBoolean(value),
                options: []
            };
        }
        case 'syntax': {
            return {
                title: 'Syntax',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                options: []
            };
        }
        case 'textarea': {
            return {
                title: 'Text Area',
                allowCreation: false,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                options: []
            };
        }
        case 'text':
        default: {
            return {
                title: 'Text',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                options: []
            };
        }
    }
}