import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Empty, InputNumber, Modal, Row, Slider, Spin, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useStripeApi } from 'hooks/UseStripeApi';
import { getConfig } from 'config/Config';
import LeftRight from 'components/common/LeftRight';

function AccountSubscription({ customer, onCustomerUpdated }) {
    const stripeApi = useStripeApi();

    const [busy, setBusy] = useState(false);
    const [nbInstances, setNbInstances] = useState(2);
    const [plans, setPlans] = useState([]);

    const source = customer && customer.sources.data.length > 0 ? customer.sources.data[0] : null;
    const subscription = customer && customer.subscriptions.data.length > 0 ? customer.subscriptions.data[0] : null;

    useEffect(() => {
        const getPlans = async () => {
            try {
                setBusy(true);
                const plans = await stripeApi.getPlans(getConfig().stripe.productId);
                setPlans(plans);
                console.debug("Plans", plans);
            } finally {
                setBusy(false);
            }
        };

        getPlans();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const selectPlan = async (plan, amount) => {
        try {
            setBusy(true);

            const proration = await stripeApi.getCurrentSubscriptionPlanProration(plan.id, nbInstances);
            console.debug("Proration", proration);

            Modal.confirm({
                title: 'Confirmation',
                content: (
                    <React.Fragment>
                        <span>{`You selected the plan "${plan.nickname}" for ${nbInstances} Redis instances.`}</span>
                        <br />
                        <span>{`The subscription amount is ${(amount / 100).toFixed(2)} ${plan.currency} per ${plan.interval}`}.</span>
                        <br />
                        <span>{`By confirming, the following amount will immediately be charged: ${(proration.cost / 100).toFixed(2)}`} ${plan.currency}.</span>
                    </React.Fragment>
                ),
                onOk: async () => {
                    try {
                        setBusy(true);

                        await stripeApi.setCurrentSubscriptionPlan(plan.id, nbInstances);

                        const customer = await stripeApi.getCurrentCustomer();
                        onCustomerUpdated(customer);
                    } finally {
                        setBusy(false);
                    }
                }
            });
        } finally {
            setBusy(false);
        }
    };

    const updateSubscription = async cancelAtPeriodEnd => {
        try {
            setBusy(true);

            await stripeApi.updateCurrentSubscription({
                cancelAtPeriodEnd
            });

            const customer = await stripeApi.getCurrentCustomer();
            onCustomerUpdated(customer);
        } finally {
            setBusy(false);
        }
    };

    const computeAmount = plan => {
        let prevUpTo = 0;
        let amount = 0;

        for (let tier of plan.tiers) {
            if (tier.up_to === null || nbInstances <= tier.up_to) {
                amount += (nbInstances - prevUpTo) * tier.unit_amount;
                break;
            }

            amount += (tier.up_to - prevUpTo) * tier.unit_amount;
            prevUpTo = tier.up_to;
        }

        return amount;
    };

    if (!source) {
        return (
            <Empty description="Please fill in your billing details and your payment method first." />
        );
    }

    return (
        <Spin spinning={busy}>
            <Descriptions title="Current Subscription" column={1} size="small" bordered style={{ marginBottom: 30 }}>
                <Descriptions.Item label="Plan">
                    <LeftRight right={(
                        <React.Fragment>
                            {subscription && !subscription.cancel_at_period_end && (
                                <Button onClick={() => updateSubscription(true)} type="danger" size="small">Cancel subscription at period end</Button>
                            )}
                            {subscription && subscription.cancel_at_period_end && (
                                <Button onClick={() => updateSubscription(false)} type="primary" size="small">Resume subscription</Button>
                            )}
                        </React.Fragment>
                    )}>
                        {subscription ? subscription.plan.nickname : 'None'}
                    </LeftRight>
                </Descriptions.Item>
                <Descriptions.Item label="Redis Instances">
                    {subscription ? subscription.quantity : 1}
                </Descriptions.Item>
                <Descriptions.Item label="Subscription End Date">
                    {subscription && subscription.cancel_at ? moment(subscription.cancel_at * 1000).toISOString() : 'Never'}
                </Descriptions.Item>
                <Descriptions.Item label="Current Period Start">
                    {subscription ? moment(subscription.current_period_start * 1000).toISOString() : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Current Period End">
                    {subscription ? moment(subscription.current_period_end * 1000).toISOString() : ''}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="Change Plan" column={1} size="small" />
            <Row gutter={20}>
                {plans.map(plan => {
                    const amount = computeAmount(plan);

                    return (
                        <Col key={plan.id} span={8}>
                            <div style={{ padding: 20, border: '3px solid #cccccc', borderRadius: 10, textAlign: 'center' }}>
                                <Typography.Title level={3}>{plan.nickname}</Typography.Title>
                                <div style={{ margin: 20 }}>
                                    <Slider
                                        min={2}
                                        max={20}
                                        onChange={value => setNbInstances(value)}
                                        value={nbInstances} />
                                    <InputNumber
                                        min={2}
                                        max={20}
                                        style={{ minWidth: 50, width: 50 }}
                                        value={nbInstances}
                                        onChange={value => setNbInstances(value)}
                                        size="small" />
                                    <span style={{ marginLeft: 10 }}>Redis Instances</span>
                                </div>
                                <Typography.Title level={4}>{(amount / 100).toFixed(2)} {plan.currency} per {plan.interval}</Typography.Title>
                                <Button
                                    type="primary"
                                    onClick={() => selectPlan(plan, amount)}>
                                    Select this plan
                                </Button>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Spin>
    );
}

AccountSubscription.propTypes = {
    customer: PropTypes.object,
    onCustomerUpdated: PropTypes.func
};

export default AccountSubscription; 