import React, { useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useStripeApi } from 'hooks/UseStripeApi';
import { getDefaultFormItemLayout, getDefaultTailFormItemLayout } from 'utils/FormUtils';

function AccountCustomer({ customer, onCustomerUpdated, form }) {
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);

    const onSubmit = () => {
        form.validateFields(async (error, values) => {
            if (error) {
                return;
            }

            try {
                setBusy(true);
                const customer = await stripeApi.setCurrentCustomer(values);
                onCustomerUpdated(customer);
            } finally {
                setBusy(false);
            }
        });
    };

    const { getFieldDecorator } = form;

    const formItemLayout = getDefaultFormItemLayout();
    const tailFormItemLayout = getDefaultTailFormItemLayout();

    return (
        <Spin spinning={busy}>
            <Form {...formItemLayout}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        initialValue: customer ? customer.name : undefined,
                        rules: [
                            {
                                required: true,
                                message: 'The name is required'
                            }
                        ]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        initialValue: customer ? customer.email : undefined,
                        rules: [
                            {
                                required: true,
                                message: 'Your email is required'
                            }
                        ]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Address">
                    <div style={{ padding: 20, border: '1px solid #cccccc', borderRadius: 5 }}>
                        <Form.Item label="Line 1" {...formItemLayout}>
                            {getFieldDecorator('address.line1', {
                                initialValue: customer && customer.address ? customer.address.line1 : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Line 1 is required'
                                    }
                                ]
                            })(
                                <Input placeholder="Line 1" />
                            )}
                        </Form.Item>
                        <Form.Item label="Line 2" {...formItemLayout}>
                            {getFieldDecorator('address.line2', {
                                initialValue: customer && customer.address ? customer.address.line2 : undefined
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="City" {...formItemLayout}>
                            {getFieldDecorator('address.city', {
                                initialValue: customer && customer.address ? customer.address.city : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Your city is required'
                                    }
                                ]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Postal Code" {...formItemLayout}>
                            {getFieldDecorator('address.postalCode', {
                                initialValue: customer && customer.address ? customer.address.postal_code : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Your postal code is required'
                                    }
                                ]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="State" {...formItemLayout}>
                            {getFieldDecorator('address.state', {
                                initialValue: customer && customer.address ? customer.address.state : undefined
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Country" {...formItemLayout}>
                            {getFieldDecorator('address.country', {
                                initialValue: customer && customer.address ? customer.address.country : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Your country is required'
                                    }
                                ]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button type="primary" onClick={onSubmit}>
                            Save
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Spin>
    );
}

AccountCustomer.propTypes = {
    customer: PropTypes.object,
    onCustomerUpdated: PropTypes.func,
    form: PropTypes.object.isRequired
};

export default Form.create({ name: 'customer' })(AccountCustomer); 