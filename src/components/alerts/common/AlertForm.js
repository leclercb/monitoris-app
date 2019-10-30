import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Tooltip } from 'antd';
import { getAlertFields } from 'data/DataAlertFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { AlertPropType } from 'proptypes/AlertPropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

const QUEUE_DELAY = 60;

function AlertForm(props) {
    const fields = getAlertFields();

    const { getFieldDecorator } = props.form;

    const formItemLayout = getDefaultFormItemLayout();

    return (
        <Form {...formItemLayout}>
            {fields.filter(field => field.visible !== false).map(field => (
                <Form.Item key={field.id} label={field.title}>
                    {getFieldDecorator(field.id, {
                        valuePropName: getValuePropNameForType(field.type),
                        initialValue: props.alert[field.id]
                    })(
                        getInputForType(
                            field.type,
                            field.options,
                            {
                                disabled: !field.editable,
                                onCommit: () => onCommitForm(props.form, props.alert, props.updateAlert)
                            })
                    )}
                    {field.id === 'historySize' && (
                        <Tooltip title={(
                            <React.Fragment>
                                <span>In order to avoid flapping, the severity is only decreased when the last X severities are all lower than the current one.</span>
                                <br />
                                <span>As the Redis instance is checked every {QUEUE_DELAY} seconds, it also means that the severity can decrease minimum (X * {QUEUE_DELAY}) seconds after an increase.</span>
                            </React.Fragment>
                        )}>
                            <Icon type="info-circle" theme="twoTone" style={{ marginLeft: 10, fontSize: 16 }} />
                        </Tooltip>
                    )}
                </Form.Item>
            ))}
        </Form>
    );
}

AlertForm.propTypes = {
    form: PropTypes.object.isRequired,
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired
};

export default Form.create({ name: 'alert' })(AlertForm);