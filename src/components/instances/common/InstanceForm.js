import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { getInstanceFields } from 'data/DataInstanceFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { InstancePropType } from 'proptypes/InstancePropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

function InstanceForm(props) {
    const fields = getInstanceFields();

    const { getFieldDecorator } = props.form;

    const formItemLayout = getDefaultFormItemLayout();

    return (
        <Form {...formItemLayout}>
            {fields.filter(field => field.visible !== false).map(field => (
                <Form.Item key={field.id} label={field.title}>
                    {getFieldDecorator(field.id, {
                        valuePropName: getValuePropNameForType(field.type),
                        initialValue: props.instance[field.id]
                    })(
                        getInputForType(
                            field.type,
                            field.options,
                            {
                                onCommit: () => onCommitForm(props.form, props.instance, props.updateInstance)
                            })
                    )}
                </Form.Item>
            ))}
        </Form>
    );
}

InstanceForm.propTypes = {
    form: PropTypes.object.isRequired,
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default Form.create({ name: 'instance' })(InstanceForm);