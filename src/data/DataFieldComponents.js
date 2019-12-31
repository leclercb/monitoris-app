/* eslint react/display-name: 0 react/prop-types: 0 */

import React from 'react';
import { Checkbox, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getFieldType } from 'data/DataFieldTypes';
import AlertNotificationTypeSelect from 'components/alertnotificationtypes/AlertNotificationTypeSelect';
import AlertNotificationTypeTitle from 'components/alertnotificationtypes/AlertNotificationTypeTitle';
import AlertTitle from 'components/alerts/common/AlertTitle';
import AlertSelect from 'components/alerts/common/AlertSelect';
import ColorPicker from 'components/common/ColorPicker';
import DatePicker from 'components/common/DatePicker';
import ExtendedDatePicker from 'components/common/ExtendedDatePicker';
import FileSizeField from 'components/common/FileSizeField';
import ModalPasswordField from 'components/common/ModalPasswordField';
import StarCheckbox from 'components/common/StarCheckbox';
import InstanceSelect from 'components/instances/common/InstanceSelect';
import InstancesSelect from 'components/instances/common/InstancesSelect';
import InstanceTitle from 'components/instances/common/InstanceTitle';
import InstancesTitle from 'components/instances/common/InstancesTitle';
import InstanceTypeSelect from 'components/instancetypes/InstanceTypeSelect';
import InstanceTypeTitle from 'components/instancetypes/InstanceTypeTitle';
import RedisTypeSelect from 'components/redistype/RedisTypeSelect';
import RedisTypeTitle from 'components/redistype/RedisTypeTitle';
import SeveritiesSelect from 'components/severities/SeveritiesSelect';
import SeveritiesTitle from 'components/severities/SeveritiesTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import SeveritySelect from 'components/severities/SeveritySelect';
import { toStringFileSize, toStringNumber, toStringPassword } from 'utils/StringUtils';

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
        case 'alertNotificationType': {
            configuration = {
                render: value => (
                    <AlertNotificationTypeTitle alertNotificationTypeId={value} />
                ),
                input: props => (
                    <AlertNotificationTypeSelect
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
        case 'date': {
            const extended = options && options.extended === true;
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';

            configuration = {
                render: value => {
                    if (extended && Number.isInteger(value)) {
                        return value;
                    }

                    return value ? moment(value).format(dateFormat) : (<span>&nbsp;</span>);
                },
                input: props => {
                    if (extended) {
                        return (
                            <ExtendedDatePicker
                                onBlur={props.onCommit}
                                onOpenChange={status => {
                                    if (props.onCommit && !status) {
                                        props.onCommit();
                                    }
                                }}
                                format={dateFormat}
                                {...removeExtraProps(props)} />
                        );
                    }

                    return (
                        <DatePicker
                            onOpenChange={status => {
                                if (props.onCommit && !status) {
                                    props.onCommit();
                                }
                            }}
                            onChange={value => {
                                if (props.onCommit && value === null) {
                                    props.onCommit();
                                }
                            }}
                            format={dateFormat}
                            {...removeExtraProps(props)} />
                    );
                }
            };

            break;
        }
        case 'dateTime': {
            const extended = options && options.extended === true;
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';
            const timeFormat = options && options.timeFormat ? options.timeFormat : 'HH:mm';

            configuration = {
                render: value => {
                    if (extended && Number.isInteger(value)) {
                        return value;
                    }

                    return value ? moment(value).format(`${dateFormat} ${timeFormat}`) : (<span>&nbsp;</span>);
                },
                input: props => {
                    if (extended) {
                        return (
                            <ExtendedDatePicker
                                onBlur={props.onCommit}
                                onOpenChange={status => {
                                    if (props.onCommit && !status) {
                                        props.onCommit();
                                    }
                                }}
                                showTime={{ format: timeFormat }}
                                format={`${dateFormat} ${timeFormat}`}
                                {...removeExtraProps(props)} />
                        );
                    }

                    return (
                        <DatePicker
                            onOpenChange={status => {
                                if (props.onCommit && !status) {
                                    props.onCommit();
                                }
                            }}
                            onChange={value => {
                                if (props.onCommit && value === null) {
                                    props.onCommit();
                                }
                            }}
                            showTime={{ format: timeFormat }}
                            format={`${dateFormat} ${timeFormat}`}
                            {...removeExtraProps(props)} />
                    );
                }
            };

            break;
        }
        case 'fileSize': {
            configuration = {
                render: value => <span>{toStringFileSize(value)}</span>,
                input: props => (
                    <FileSizeField
                        onChange={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'instance': {
            configuration = {
                render: value => (
                    <InstanceTitle instanceId={value} />
                ),
                input: props => (
                    <InstanceSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'instances': {
            configuration = {
                render: value => (
                    <InstancesTitle instanceIds={value} />
                ),
                input: props => (
                    <InstancesSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'instanceType': {
            configuration = {
                render: value => (
                    <InstanceTypeTitle typeId={value} />
                ),
                input: props => (
                    <InstanceTypeSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'number': {
            const min = options && options.min ? options.min : -Infinity;
            const max = options && options.max ? options.max : Infinity;

            configuration = {
                render: value => <span>{toStringNumber(value)}</span>,
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
            const mode = options && options.mode;

            configuration = {
                render: value => value ? toStringPassword(value) : <span>&nbsp;</span>,
                input: props => {
                    if (mode === 'modal') {
                        return (
                            <ModalPasswordField
                                onChange={props.onCommit}
                                {...removeExtraProps(props)} />
                        );
                    }

                    return (
                        <Input.Password
                            onBlur={props.onCommit}
                            onPressEnter={props.onCommit}
                            {...removeExtraProps(props)} />
                    );
                }
            };

            break;
        }
        case 'redisType': {
            configuration = {
                render: value => (
                    <RedisTypeTitle typeId={value} />
                ),
                input: props => (
                    <RedisTypeSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
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
        case 'severities': {
            configuration = {
                render: value => (
                    <SeveritiesTitle severityIds={value} />
                ),
                input: props => (
                    <SeveritiesSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'severity': {
            configuration = {
                render: value => (
                    <SeverityTitle severityId={value} />
                ),
                input: props => (
                    <SeveritySelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'star': {
            configuration = {
                render: value => (
                    <StarCheckbox checked={!!value} />
                ),
                input: props => (
                    <StarCheckbox
                        onChange={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'syntax': {
            const language = options && options.language ? options.language : 'json';

            configuration = {
                render: value => (
                    <SyntaxHighlighter
                        language={language}
                        style={atomOneLight}
                        customStyle={{
                            wordBreak: 'break-all',
                            whiteSpace: 'pre-wrap'
                        }}>
                        {value || ''}
                    </SyntaxHighlighter>
                ),
                input: props => (
                    <Input
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'textarea': {
            configuration = {
                render: value => (
                    <Input.TextArea
                        value={value}
                        readOnly={true}
                        autoSize={true} />
                ),
                input: props => (
                    <Input.TextArea
                        onBlur={props.onCommit}
                        autoSize={true}
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