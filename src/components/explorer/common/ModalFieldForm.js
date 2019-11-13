import React from 'react';
import { Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import { getInputForType } from 'data/DataFieldComponents';
import { getValuePropNameForType } from 'data/DataFieldTypes';
import { getDefaultFormItemLayout } from 'utils/FormUtils';

function ModalFieldForm({ form, fields, title, visible, onOk, onCancel }) {
    const { getFieldDecorator } = form;

    const formItemLayout = getDefaultFormItemLayout();

    const onSave = () => {
        form.validateFields(async (error, values) => {
            if (error) {
                return;
            }

            onOk(values);
        });
    };

    return (
        <Modal
            title={title}
            visible={visible}
            width="60%"
            closable={false}
            onOk={onSave}
            onCancel={onCancel}>
            <Form {...formItemLayout}>
                {fields.filter(field => field.visible !== false).map(field => (
                    <Form.Item key={field.id} label={field.title}>
                        {getFieldDecorator(field.id, {
                            valuePropName: getValuePropNameForType(field.type)
                        })(
                            getInputForType(
                                field.type,
                                field.options,
                                {
                                    disabled: !field.editable
                                })
                        )}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
}

ModalFieldForm.propTypes = {
    form: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default Form.create({ name: 'field' })(ModalFieldForm);