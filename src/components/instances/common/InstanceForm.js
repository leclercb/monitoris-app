import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Form } from 'antd';
import { getConfig } from 'config/Config';
import { getInstanceFields } from 'data/DataInstanceFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { InstancePropType } from 'proptypes/InstancePropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

function InstanceForm({ instance, updateInstance, form }) {
    const fields = getInstanceFields(instance.type);

    const { getFieldDecorator } = form;

    const formItemLayout = getDefaultFormItemLayout();

    return (
        <React.Fragment>
            {instance.type === 'direct' && (
                <Alert
                    message="Direct connection is only intended for development or testing servers. Do not use it for production !"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}
            {instance.type === 'proxy' && (
                <Alert
                    message={(<span>Proxy connection requires a client. Client and documentation available <a href={getConfig().clientUrl}>here</a>.</span>)}
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}
            <Form {...formItemLayout}>
                {fields.filter(field => field.visible !== false).map(field => (
                    <Form.Item key={field.id} label={field.title}>
                        {getFieldDecorator(field.id, {
                            valuePropName: getValuePropNameForType(field.type),
                            initialValue: instance[field.id]
                        })(
                            getInputForType(
                                field.type,
                                field.options,
                                {
                                    readOnly: !field.editable,
                                    onCommit: () => onCommitForm(form, instance, updateInstance)
                                })
                        )}
                    </Form.Item>
                ))}
            </Form>
        </React.Fragment>
    );
}

InstanceForm.propTypes = {
    form: PropTypes.object.isRequired,
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default Form.create({ name: 'instance' })(InstanceForm);