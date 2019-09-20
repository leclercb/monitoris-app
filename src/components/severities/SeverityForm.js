import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { getSeverityFields } from 'data/DataSeverityFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { SeverityPropType } from 'proptypes/SeverityPropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

function SeverityForm(props) {
    const fields = getSeverityFields();

    const { getFieldDecorator } = props.form;

    const formItemLayout = getDefaultFormItemLayout();

    return (
        <Form {...formItemLayout}>
            {fields.filter(field => field.visible !== false).map(field => (
                <Form.Item key={field.id} label={field.title}>
                    {getFieldDecorator(field.id, {
                        valuePropName: getValuePropNameForType(field.type),
                        initialValue: props.severity[field.id]
                    })(
                        getInputForType(
                            field.type,
                            field.options,
                            {
                                onCommit: () => onCommitForm(props.form, props.severity, props.updateSeverity)
                            })
                    )}
                </Form.Item>
            ))}
        </Form>
    );
}

SeverityForm.propTypes = {
    form: PropTypes.object.isRequired,
    severity: SeverityPropType.isRequired,
    updateSeverity: PropTypes.func.isRequired
};

export default Form.create({ name: 'severity' })(SeverityForm);