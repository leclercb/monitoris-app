import React from 'react';
import { Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { getDefaultFormItemLayout } from 'utils/FormUtils';

function ModalFieldForm({ fields, title, visible, onOk, onCancel }) {
    const [form] = Form.useForm();

    const formItemLayout = getDefaultFormItemLayout();

    const onSave = async () => {
        try {
            const values = await form.validateFields();
            onOk(values);
        } catch (error) {
            // Skip
        }
    };

    return (
        <Modal
            title={title}
            visible={visible}
            width="60%"
            closable={false}
            onOk={onSave}
            onCancel={onCancel}>
            <Form form={form} {...formItemLayout}>
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
                                disabled: !field.editable
                            })}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
}

ModalFieldForm.propTypes = {
    fields: PropTypes.array.isRequired,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ModalFieldForm;