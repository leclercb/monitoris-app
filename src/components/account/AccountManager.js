import React, { useEffect, useState } from 'react';
import { Descriptions, Spin } from 'antd';
import { getConfig } from 'config/Config';
import { useItemApi } from 'hooks/UseItemApi';
import { useStripeApi } from 'hooks/UseStripeApi';

function AccountManager() {
    const itemApi = useItemApi();
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);
    const [item, setItem] = useState(null);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setBusy(true);

                const item = await itemApi.getItem(getConfig().cloudItemSku);
                const customer = await stripeApi.getCurrentCustomer();

                setItem(item);
                setCustomer(customer);

                console.log(customer);
            } finally {
                setBusy(false);
            }
        }

        fetchItem();
    }, [getConfig().itemSku]);

    return (
        <Spin spinning={busy}>
            {!!item && !!customer && (
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Product">{item.name}</Descriptions.Item>
                    <Descriptions.Item label="Price">{item.amount} {item.currency}</Descriptions.Item>
                </Descriptions>
            )}
        </Spin>
    );
}

export default AccountManager;