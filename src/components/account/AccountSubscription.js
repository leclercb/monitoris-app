import React, { useState } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { useStripeApi } from 'hooks/UseStripeApi';

function AccountSubscription({ customer, onCustomerUpdated }) {
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);
    const subscription = customer && customer.subscription.data.length > 0 ? customer.subscription.data[0] : null;

    const onSubmit = async () => {
        try {
            setBusy(true);

            const customer = await stripeApi.getCurrentCustomer();
            onCustomerUpdated(customer);
        } finally {
            setBusy(false);
        }
    };

    return (
        <Spin spinning={busy}>

        </Spin>
    );
}

AccountSubscription.propTypes = {
    customer: PropTypes.object,
    onCustomerUpdated: PropTypes.func
};

export default AccountSubscription; 