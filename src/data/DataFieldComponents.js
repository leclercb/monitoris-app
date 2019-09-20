/* eslint react/display-name: 0 react/prop-types: 0 */

import React from 'react';
import moment from 'moment';
import { Checkbox, Input, InputNumber, Progress, Select, Tag } from 'antd';
import { getFieldType } from 'data/DataFieldTypes';
import AlertTitle from 'components/alerts/AlertTitle';
import AlertSelect from 'components/alerts/AlertSelect';
import ColorPicker from 'components/common/ColorPicker';
import DatePicker from 'components/common/DatePicker';
import InstanceTitle from 'components/instances/InstanceTitle';
import InstanceSelect from 'components/instances/InstanceSelect';
import {
    toStringNumber,
    toStringPassword,
    toStringRepeat
} from 'utils/StringUtils';

export function getDefaultGetValueFromEvent(e) {
    if (!e || !e.target) {
        return e;
    }
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
}

export function getRenderForType(type, options, value, props = {}) {
    return getFieldComponents(type, options).render(value, props);
}

export function getInputForType(type, options, props = {}) {
    return getFieldComponents(type, options).input(props);
}

export function getSelectForType(type, props = {}) {
    return getFieldComponents(type).select(props);
}

export function getFieldComponents(type, options) {
    let configuration = null;

    const removeExtraProps = props => {
        const { ...wrappedProps } = props;
        delete wrappedProps.fieldMode;
        delete wrappedProps.onCommit;
        return wrappedProps;
    };

    switch (type) {
        case 'alert': {
            configuration = {
                render: value => (
                    <AlertTitle alertId={value} />
                ),
                input: props => (
                    <AlertSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'boolean': {
            configuration = {
                render: value => <Checkbox checked={!!value} />,
                input: props => (
                    <Checkbox
                        onChange={props.onCommit}
                        data-prevent-default={true}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'color': {
            configuration = {
                render: value => <ColorPicker color={value} />,
                input: props => (
                    <ColorPicker
                        onClose={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'number': {
            const min = options && options.min ? options.min : -Infinity;
            const max = options && options.max ? options.max : Infinity;

            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        onBlur={props.onCommit}
                        min={min}
                        max={max}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'password': {
            configuration = {
                render: value => value ? toStringPassword(value) : <span>&nbsp;</span>,
                input: props => (
                    <Input.Password
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'select': {
            let values = options && options.values ? options.values : [];
            values = Array.isArray(values) ? values : [values];

            configuration = {
                render: value => (
                    value ? value : <span>&nbsp;</span>
                ),
                input: props => (
                    <Select
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)}>
                        {values.map(value => {
                            value = typeof value === 'object' ? value : {
                                title: value,
                                value
                            };

                            return (
                                <Select.Option key={value.value} value={value.value}>
                                    {value.title}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )
            };

            break;
        }
        case 'selectTags': {
            let values = options && options.values ? options.values : [];
            values = Array.isArray(values) ? values : [values];

            configuration = {
                render: values => (
                    values ? values.map(value => (<Tag key={value}>{value}</Tag>)) : <span>&nbsp;</span>
                ),
                input: props => {
                    return (
                        <Select
                            onBlur={props.onCommit}
                            dropdownMatchSelectWidth={false}
                            mode="tags"
                            {...removeExtraProps(props)}>
                            {values.map(value => {
                                value = typeof value === 'object' ? value : {
                                    title: value,
                                    value
                                };

                                return (
                                    <Select.Option key={value.value} value={value.value}>
                                        {value.title}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    );
                }
            };

            break;
        }
        case 'star': {
            configuration = {
                render: value => <StarCheckbox checked={!!value} />,
                input: props => (
                    <StarCheckbox
                        onChange={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'textarea': {
            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input.TextArea
                        onBlur={props.onCommit}
                        autosize={true}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'text':
        default: {
            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
    }

    configuration.select = props => (
        <Select
            dropdownMatchSelectWidth={false}
            placeholder="Condition"
            {...props}>
            {getFieldType(type).conditions.filter(condition => condition.visible !== false).map(condition => (
                <Select.Option
                    key={condition.type}
                    value={condition.type}>
                    {condition.title}
                </Select.Option>
            ))}
        </Select>
    );

    return configuration;
}