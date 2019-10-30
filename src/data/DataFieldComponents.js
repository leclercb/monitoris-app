/* eslint react/display-name: 0 react/prop-types: 0 */

import React from 'react';
import { Checkbox, Input, InputNumber, Select } from 'antd';
import { getFieldType } from 'data/DataFieldTypes';
import AlertNotificationTypeSelect from 'components/alertnotificationtypes/AlertNotificationTypeSelect';
import AlertNotificationTypeTitle from 'components/alertnotificationtypes/AlertNotificationTypeTitle';
import AlertTitle from 'components/alerts/common/AlertTitle';
import AlertSelect from 'components/alerts/common/AlertSelect';
import ColorPicker from 'components/common/ColorPicker';
import StarCheckbox from 'components/common/StarCheckbox';
import InstanceSelect from 'components/instances/common/InstanceSelect';
import InstancesSelect from 'components/instances/common/InstancesSelect';
import InstanceTitle from 'components/instances/common/InstanceTitle';
import InstancesTitle from 'components/instances/common/InstancesTitle';
import InstanceTypeSelect from 'components/instancetypes/InstanceTypeSelect';
import InstanceTypeTitle from 'components/instancetypes/InstanceTypeTitle';
import SeveritiesSelect from 'components/severities/SeveritiesSelect';
import SeveritiesTitle from 'components/severities/SeveritiesTitle';
import SeverityTitle from 'components/severities/SeverityTitle';
import SeveritySelect from 'components/severities/SeveritySelect';
import { toStringPassword } from 'utils/StringUtils';

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