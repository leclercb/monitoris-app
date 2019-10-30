import React, { useState } from 'react';
import { Button, Col, InputNumber, List, Slider, Typography } from 'antd';
import PropTypes from 'prop-types';

function Plan({ plan, onSelectPlan }) {
    const [nbInstances, setNbInstances] = useState(1);

    const getFeaturesFromPlan = (plan, nbInstances) => {
        switch (plan.nickname) {
            case 'Free':
                return [
                    (<strong key={0}>Free forever</strong>),
                    (<strong key={1}>{`${nbInstances} Redis Instance${nbInstances > 1 ? 's' : ''}`}</strong>),
                    (<strong key={2}>{`${nbInstances * 5} Alert Configurations`}</strong>),
                    'Email Notifications'
                ];
            case 'Monthly':
                return [
                    (<strong key={1}>{`${nbInstances} Redis Instance${nbInstances > 1 ? 's' : ''}`}</strong>),
                    (<strong key={2}>{`${nbInstances * 5} Alert Configurations`}</strong>),
                    'Email Notifications',
                    'SMS Notififications',
                    'HTTP Notifications'
                ];
            case 'Yearly':
                return [
                    (<strong key={1}>{`${nbInstances} Redis Instance${nbInstances > 1 ? 's' : ''}`}</strong>),
                    (<strong key={2}>{`${nbInstances * 5} Alert Configurations`}</strong>),
                    'Email Notifications',
                    'SMS Notififications',
                    'HTTP Notifications'
                ];
            default:
                return [];
        }
    };

    const computeAmount = plan => {
        let prevUpTo = 0;
        let amount = 0;

        if (!plan.tiers) {
            return plan.amount;
        }

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

    const amount = computeAmount(plan);
    const features = getFeaturesFromPlan(plan, nbInstances);

    return (
        <Col span={8}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 20,
                border: '3px solid #cccccc',
                borderRadius: 10,
                textAlign: 'center',
                height: '100%'
            }}>
                <Typography.Title level={3}>{plan.nickname}</Typography.Title>
                <div style={{ margin: 20 }}>
                    {plan.id === 'free' && (
                        <span style={{ marginLeft: 10 }}>1 Redis Instance</span>
                    )}
                    {plan.id !== 'free' && (
                        <React.Fragment>
                            <Slider
                                min={1}
                                max={20}
                                onChange={value => setNbInstances(value)}
                                value={nbInstances} />
                            <InputNumber
                                min={1}
                                max={20}
                                style={{ minWidth: 50, width: 50 }}
                                value={nbInstances}
                                onChange={value => setNbInstances(value)}
                                size="small" />
                            <span style={{ marginLeft: 10 }}>{`Redis instance${nbInstances > 1 ? 's' : ''}`}</span>
                        </React.Fragment>
                    )}
                    <List
                        dataSource={features}
                        size="small"
                        bordered={false}
                        style={{ marginTop: 20 }}
                        renderItem={item => (
                            <List.Item>
                                <span>{item}</span>
                            </List.Item>
                        )} />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    {plan.id === 'free' && (
                        <Typography.Title level={4}>Free</Typography.Title>
                    )}
                    {plan.id !== 'free' && (
                        <Typography.Title level={4}>
                            {(amount / 100).toFixed(2)} <span style={{ fontWeight: 'normal' }}>{plan.currency} per {plan.interval}</span>
                        </Typography.Title>
                    )}
                    {onSelectPlan && (
                        <Button
                            type="primary"
                            onClick={() => onSelectPlan(plan, amount, nbInstances)}>
                            Select this plan
                        </Button>
                    )}
                </div>
            </div>
        </Col>
    );
}

Plan.propTypes = {
    plan: PropTypes.object.isRequired,
    onSelectPlan: PropTypes.func
};

export default Plan;