import moment from 'moment';

export function getConditionsForType(type) {
    return getFieldFilterType(type).conditions;
}

export function getConditionsFieldTypeForType(type) {
    return getFieldFilterType(type).conditionsFieldType;
}

function getFieldFilterType(type) {
    switch (type) {
        case 'alert': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'alert'
            };
        }
        case 'alertNotificationType': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'alertNotificationType'
            };
        }
        case 'boolean': {
            return {
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
                conditionsFieldType: 'boolean'
            };
        }
        case 'color': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'color'
            };
        }
        case 'date': {
            return {
                conditions: [
                    {
                        type: 'dateEqual',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return true;
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateNotEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return false;
                            }

                            if (!conditionValue || !objectValue) {
                                return true;
                            }

                            return !moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateBefore',
                        title: 'Before',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateBeforeOrEqual',
                        title: 'Before or equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateAfter',
                        title: 'After',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateAfterOrEqual',
                        title: 'After or equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeEqual',
                        title: 'Equals',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return true;
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeNotEqual',
                        title: 'Does not equal',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return false;
                            }

                            if (!conditionValue || !objectValue) {
                                return true;
                            }

                            return !moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeBefore',
                        title: 'Before',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeBeforeOrEqual',
                        title: 'Before or equals',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeAfter',
                        title: 'After',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeAfterOrEqual',
                        title: 'After or equals',
                        multi: false,
                        visible: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrAfter(moment(conditionValue), 'day');
                        }
                    }
                ],
                conditionsFieldType: 'date'
            };
        }
        case 'dateTime': {
            return {
                conditions: [
                    {
                        type: 'dateEqual',
                        title: 'Equals (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return true;
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateNotEqual',
                        title: 'Does not equal (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return false;
                            }

                            if (!conditionValue || !objectValue) {
                                return true;
                            }

                            return !moment(conditionValue).isSame(moment(objectValue), 'day');
                        }
                    },
                    {
                        type: 'dateBefore',
                        title: 'Before (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateBeforeOrEqual',
                        title: 'Before or equals (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateAfter',
                        title: 'After (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateAfterOrEqual',
                        title: 'After or equals (compare date only)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'dateTimeEqual',
                        title: 'Equals (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return true;
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(objectValue), 'minute');
                        }
                    },
                    {
                        type: 'dateTimeNotEqual',
                        title: 'Does not equal (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue && !objectValue) {
                                return false;
                            }

                            if (!conditionValue || !objectValue) {
                                return true;
                            }

                            return !moment(conditionValue).isSame(moment(objectValue), 'minute');
                        }
                    },
                    {
                        type: 'dateTimeBefore',
                        title: 'Before (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isBefore(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'dateTimeBeforeOrEqual',
                        title: 'Before or equals (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrBefore(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'dateTimeAfter',
                        title: 'After (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isAfter(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'dateTimeAfterOrEqual',
                        title: 'After or equals (compare date and time)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            if (Number.isInteger(conditionValue)) {
                                conditionValue = moment().add(Number.parseInt(conditionValue), 'day').toISOString();
                            }

                            if (!conditionValue || !objectValue) {
                                return false;
                            }

                            return moment(objectValue).isSameOrAfter(moment(conditionValue), 'minute');
                        }
                    }
                ],
                conditionsFieldType: 'dateTime'
            };
        }
        case 'fileSize': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) === (objectValue || 0);
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) !== (objectValue || 0);
                        }
                    },
                    {
                        type: 'greaterThan',
                        title: 'Greater than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) < (objectValue || 0);
                        }
                    },
                    {
                        type: 'greaterThanOrEqual',
                        title: 'Greater than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) <= (objectValue || 0);
                        }
                    },
                    {
                        type: 'lessThan',
                        title: 'Less than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) > (objectValue || 0);
                        }
                    },
                    {
                        type: 'lessThanOrEqual',
                        title: 'Less than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) >= (objectValue || 0);
                        }
                    }
                ],
                conditionsFieldType: 'fileSize'
            };
        }
        case 'instance': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'instance'
            };
        }
        case 'instances': {
            return {
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
                conditionsFieldType: 'instances'
            };
        }
        case 'instanceType': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'instanceType'
            };
        }
        case 'number': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) === (objectValue || 0);
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) !== (objectValue || 0);
                        }
                    },
                    {
                        type: 'greaterThan',
                        title: 'Greater than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) < (objectValue || 0);
                        }
                    },
                    {
                        type: 'greaterThanOrEqual',
                        title: 'Greater than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) <= (objectValue || 0);
                        }
                    },
                    {
                        type: 'lessThan',
                        title: 'Less than',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) > (objectValue || 0);
                        }
                    },
                    {
                        type: 'lessThanOrEqual',
                        title: 'Less than or equal',
                        multi: true,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || 0) >= (objectValue || 0);
                        }
                    }
                ],
                conditionsFieldType: 'number'
            };
        }
        case 'password': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'password'
            };
        }
        case 'redisType': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'redisType'
            };
        }
        case 'select': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'select'
            };
        }
        case 'severities': {
            return {
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
                conditionsFieldType: 'severities'
            };
        }
        case 'severity': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'severity'
            };
        }
        case 'star': {
            return {
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
                conditionsFieldType: 'star'
            };
        }
        case 'syntax': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue || '');
                        }
                    }
                ],
                conditionsFieldType: 'syntax'
            };
        }
        case 'textarea': {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'equalIgnoreCase',
                        title: 'Equals (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '').toUpperCase() === (objectValue || '').toUpperCase();
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqualIgnoreCase',
                        title: 'Does not equal (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '').toUpperCase() !== (objectValue || '').toUpperCase();
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'containIgnoreCase',
                        title: 'Contains (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').toUpperCase().includes((conditionValue || '').toUpperCase());
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'notContainIgnoreCase',
                        title: 'Does not contain (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').toUpperCase().includes((conditionValue || '').toUpperCase());
                        }
                    }
                ],
                conditionsFieldType: 'textarea'
            };
        }
        case 'text':
        default: {
            return {
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') === (objectValue || '');
                        }
                    },
                    {
                        type: 'equalIgnoreCase',
                        title: 'Equals (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '').toUpperCase() === (objectValue || '').toUpperCase();
                        }
                    },
                    {
                        type: 'notEqual',
                        title: 'Does not equal',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '') !== (objectValue || '');
                        }
                    },
                    {
                        type: 'notEqualIgnoreCase',
                        title: 'Does not equal (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (conditionValue || '').toUpperCase() !== (objectValue || '').toUpperCase();
                        }
                    },
                    {
                        type: 'contain',
                        title: 'Contains',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'containIgnoreCase',
                        title: 'Contains (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return (objectValue || '').toUpperCase().includes((conditionValue || '').toUpperCase());
                        }
                    },
                    {
                        type: 'notContain',
                        title: 'Does not contain',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').includes(conditionValue || '');
                        }
                    },
                    {
                        type: 'notContainIgnoreCase',
                        title: 'Does not contain (ignore case)',
                        multi: false,
                        apply: (conditionValue, objectValue) => {
                            return !(objectValue || '').toUpperCase().includes((conditionValue || '').toUpperCase());
                        }
                    }
                ],
                conditionsFieldType: 'text'
            };
        }
    }
}