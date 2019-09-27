import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { getAlertFields } from 'data/DataAlertFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { AlertPropType } from 'proptypes/AlertPropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

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