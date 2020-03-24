import React, { useEffect } from 'react';
import { Alert, Form } from 'antd';
import PropTypes from 'prop-types';
import { getConfig } from 'config/Config';
import { getInstanceFields } from 'data/DataInstanceFields';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { InstancePropType } from 'proptypes/InstancePropTypes';
import { getDefaultFormItemLayout, onCommitForm } from 'utils/FormUtils';

function InstanceForm({ instance, updateInstance }) {
    const [form] = Form.useForm();

    const fields = getInstanceFields(instance.type);

    const formItemLayout = getDefaultFormItemLayout();

    useEffect(() => {
        form.resetFields();
    }, [instance]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    message={(<span>Proxy connection requires a client. Client and documentation available <a href={getConfig().clientUrl} target="_blank" rel="noopener noreferrer">here</a>.</span>)}
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}
            <Form form={form} initialValues={instance} {...formItemLayout}>
                {fields.filter(field => field.visible !== false).map(field => (
                    <Form.Item
                        key={field.id}
                        name={field.id}
                        label={field.title}
                        valuePropName={getValuePropNameForType(field.type)}>
                        {getInputForType(
                            field.type,
                            field.options,
                            {
                                readOnly: !field.editable,
                                onCommit: () => onCommitForm(form, instance, updateInstance)
                            })}
                    </Form.Item>
                ))}
            </Form>
            {instance.type === 'proxy' && !instance.secret && (
                <Alert
                    message="A secret is mandatory for proxy connections"
                    type="error"
                    showIcon
                    style={{ marginTop: 20 }}
                />
            )}
        </React.Fragment>
    );
}

InstanceForm.propTypes = {
    instance: InstancePropType.isRequired,
    updateInstance: PropTypes.func.isRequired
};

export default InstanceForm;