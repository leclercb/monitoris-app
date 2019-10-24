import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Form, Input, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useStripeApi } from 'hooks/UseStripeApi';
import { getDefaultFormItemLayout, getDefaultTailFormItemLayout } from 'utils/FormUtils';

function AccountManager({ form, stripe }) {
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setBusy(true);

                const customer = await stripeApi.getCurrentCustomer();

                setCustomer(customer);

                console.log(customer);
            } finally {
                setBusy(false);
            }
        };

        fetchItem();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = () => {
        form.validateFields(async (error, values) => {
            if (error) {
                //return;
            }

            try {
                setBusy(true);

                console.log(values);

                const createTokenResult = await stripe.createToken();

                if (createTokenResult.error) {
                    message.error(createTokenResult.error.message);
                    return;
                }

                console.log(createTokenResult);
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
            {!!customer && (
                <Descriptions title="Customer" column={1} bordered>
                    <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
                </Descriptions>
            )}
            <Form {...formItemLayout}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        initialValue: customer.name,
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
                        initialValue: customer.email,
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
                                initialValue: customer.address ? customer.address.line1 : undefined,
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
                                initialValue: customer.address ? customer.address.line2 : undefined
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="State" {...formItemLayout}>
                            {getFieldDecorator('address.state', {
                                initialValue: customer.address ? customer.address.state : undefined
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="City" {...formItemLayout}>
                            {getFieldDecorator('address.city', {
                                initialValue: customer.address ? customer.address.city : undefined,
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
                            {getFieldDecorator('address.postal_code', {
                                initialValue: customer.address ? customer.address.postal_code : undefined,
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
                        <Form.Item label="Country" {...formItemLayout}>
                            {getFieldDecorator('address.country', {
                                initialValue: customer.address ? customer.address.country : undefined,
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
                <Form.Item label="Credit Card">
                    <div style={{ padding: 20, border: '1px solid #cccccc', borderRadius: 5 }}>
                        <CardElement />
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

AccountManager.propTypes = {
    form: PropTypes.object.isRequired,
    stripe: PropTypes.object.isRequired
};

export default Form.create({ name: 'checkout' })(injectStripe(AccountManager)); 