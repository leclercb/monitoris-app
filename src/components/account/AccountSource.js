import React, { useState } from 'react';
import { Button, Descriptions, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useStripeApi } from 'hooks/UseStripeApi';

function AccountSource({ customer, stripe }) {
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);
    const source = customer && customer.sources.data.length > 0 ? customer.sources.data[0] : null;

    const onSubmit = async () => {
        try {
            setBusy(true);

            const createTokenResult = await stripe.createToken();

            if (createTokenResult.error) {
                message.error(createTokenResult.error.message);
                return;
            }

            console.log(createTokenResult);
        } finally {
            setBusy(false);
        }
    };

    return (
        <Spin spinning={busy}>
            {!!source && (
                <Descriptions title="Card" column={1} size="small" bordered style={{ marginBottom: 30 }}>
                    <Descriptions.Item label="Brand">{source.brand}</Descriptions.Item>
                    <Descriptions.Item label="Card Number">**** **** **** {source.last4}</Descriptions.Item>
                    <Descriptions.Item label="Expiration">{source.exp_month}/{source.exp_year}</Descriptions.Item>
                </Descriptions>
            )}
            <div style={{ padding: 20, border: '1px solid #cccccc', borderRadius: 5 }}>
                <CardElement />
                <div style={{ width: '100%', textAlign: 'right', marginTop: 20 }}>
                    <Button type="primary" onClick={onSubmit}>
                        {source ? 'Save and replace source' : 'Add source'}
                    </Button>
                </div>
            </div>
        </Spin>
    );
}

AccountSource.propTypes = {
    customer: PropTypes.object,
    stripe: PropTypes.object.isRequired
};

export default injectStripe(AccountSource); 