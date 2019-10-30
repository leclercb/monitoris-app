import { getAlertNotificationTypes } from 'data/DataAlertNotificationTypes';
import { getInstanceTypes } from 'data/DataInstanceTypes';
import { getSeverities } from 'data/DataSeverities';
import { getAlerts } from 'selectors/AlertSelectors';
import { getInstances } from 'selectors/InstanceSelectors';
import {
    compareBooleans,
    compareNumbers,
    compareObjects,
    compareStrings
} from 'utils/CompareUtils';
import {
    toString,
    toStringBoolean,
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
        'instance',
        'instances',
        'instanceType',
        'number',
        'password',
        'severities',
        'severity',
        'star',
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

export function getConditionsForType(type) {
    return getFieldType(type).conditions;
}

export function getConditionsFieldTypeForType(type) {
    return getFieldType(type).conditionsFieldType;
}

export function getFieldType(type, options) { // eslint-disable-line no-unused-vars
    let configuration = null;

    switch (type) {
        case 'alert': {
            configuration = {
                title: 'Alert',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b, state) => compareObjects(a, b, getAlerts(state)),
                toString: (value, state) => toStringObject(value, getAlerts(state)),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'alert',
                options: []
            };

            break;
        }
        case 'alertNotificationType': {
            configuration = {
                title: 'Alert Notification Type',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getAlertNotificationTypes()),
                toString: value => toStringObject(value, getAlertNotificationTypes()),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'alertNotificationType',
                options: []
            };

            break;
        }
        case 'boolean': {
            configuration = {
                title: 'Boolean',
                allowCreation: true,
                width: 100,
                alwaysInEdition: true,
                valuePropName: 'checked',
                compare: (a, b) => compareBooleans(a, b),
                toString: value => toStringBoolean(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !!conditionValue === !!objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !!conditionValue !== !!objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'boolean',
                options: []
            };

            break;
        }
        case 'color': {
            configuration = {
                title: 'Color',
                allowCreation: true,
                width: 100,
                alwaysInEdition: false,
                valuePropName: 'color',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'color',
                options: []
            };

            break;
        }
        case 'instance': {
            configuration = {
                title: 'Instance',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b, state) => compareObjects(a, b, getInstances(state)),
                toString: (value, state) => toStringObject(value, getInstances(state)),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'instance',
                options: []
            };

            break;
        }
        case 'instances': {
            configuration = {
                title: 'Instances',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: () => 0,
                toString: (value, state) => toStringObjects(value, getInstances(state)),
                conditions: [
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            const objectValues = objectValue || [];
                            const conditionValues = conditionValue || [];

                            return conditionValues.every(item => objectValues.includes(item));
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            const objectValues = objectValue || [];
                            const conditionValues = conditionValue || [];

                            return !conditionValues.every(item => objectValues.includes(item));
                        }
                    }
                ],
                conditionsFieldType: 'instances',
                options: []
            };

            break;
        }
        case 'instanceType': {
            configuration = {
                title: 'Instance Type',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b, state) => compareObjects(a, b, getInstanceTypes(state)),
                toString: (value, state) => toStringObject(value, getInstanceTypes(state)),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'instanceType',
                options: []
            };

            break;
        }
        case 'number': {
            configuration = {
                title: 'Number',
                allowCreation: true,
                width: 150,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareNumbers(a, b),
                toString: value => toStringNumber(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    },
                    {
                        type: 'greaterThan',
                        title: 'Greater than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return conditionValue < objectValue;
                        }
                    },
                    {
                        type: 'greaterThanOrEqual',
                        title: 'Greater than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return conditionValue <= objectValue;
                        }
                    },
                    {
                        type: 'lessThan',
                        title: 'Less than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return conditionValue > objectValue;
                        }
                    },
                    {
                        type: 'lessThanOrEqual',
                        title: 'Less than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return conditionValue >= objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'number',
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

            break;
        }
        case 'password': {
            configuration = {
                title: 'Password',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toStringPassword(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue);
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue);
                        }
                    }
                ],
                conditionsFieldType: 'password',
                options: []
            };

            break;
        }
        case 'severities': {
            configuration = {
                title: 'Severities',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: () => 0,
                toString: value => toStringObjects(value, getSeverities()),
                conditions: [
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            const objectValues = objectValue || [];
                            const conditionValues = conditionValue || [];

                            return conditionValues.every(item => objectValues.includes(item));
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            const objectValues = objectValue || [];
                            const conditionValues = conditionValue || [];

                            return !conditionValues.every(item => objectValues.includes(item));
                        }
                    }
                ],
                conditionsFieldType: 'severities',
                options: []
            };

            break;
        }
        case 'severity': {
            configuration = {
                title: 'Severity',
                allowCreation: true,
                width: 200,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareObjects(a, b, getSeverities()),
                toString: value => toStringObject(value, getSeverities()),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'severity',
                options: []
            };

            break;
        }
        case 'star': {
            configuration = {
                title: 'Star',
                allowCreation: true,
                width: 100,
                alwaysInEdition: true,
                valuePropName: 'checked',
                compare: (a, b) => compareBooleans(a, b),
                toString: value => toStringBoolean(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !!conditionValue === !!objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !!conditionValue !== !!objectValue;
                        }
                    }
                ],
                conditionsFieldType: 'star',
                options: []
            };

            break;
        }
        case 'textarea': {
            configuration = {
                title: 'Text Area',
                allowCreation: false,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue);
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue);
                        }
                    }
                ],
                conditionsFieldType: 'textarea',
                options: []
            };

            break;
        }
        case 'text':
        default: {
            configuration = {
                title: 'Text',
                allowCreation: true,
                width: 250,
                alwaysInEdition: false,
                valuePropName: 'value',
                compare: (a, b) => compareStrings(a, b),
                toString: value => toString(value),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue === objectValue;
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return conditionValue !== objectValue;
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue);
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue);
                        }
                    }
                ],
                conditionsFieldType: 'text',
                options: []
            };

            break;
        }
    }

    return configuration;
}