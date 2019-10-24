import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCurrentCustomer,
    getCurrentSubscriptionPlanProration,
    setCurrentCustomer,
    setCurrentCustomerSource,
    setCurrentSubscriptionPlan
} from 'actions/StripeActions';

export function useStripeApi() {
    const dispatch = useDispatch();

    const getCurrentCustomerCallback = useCallback(
        () => dispatch(getCurrentCustomer()),
        [dispatch]
    );

    const getCurrentSubscriptionPlanProrationCallback = useCallback(
        planId => dispatch(getCurrentSubscriptionPlanProration(planId)),
        [dispatch]
    );

    const setCurrentCustomerCallback = useCallback(
        customer => dispatch(setCurrentCustomer(customer)),
        [dispatch]
    );

    const setCurrentCustomerSourceCallback = useCallback(
        source => dispatch(setCurrentCustomerSource(source)),
        [dispatch]
    );

    const setCurrentSubscriptionPlanCallback = useCallback(
        planId => dispatch(setCurrentSubscriptionPlan(planId)),
        [dispatch]
    );

    return {
        getCurrentCustomer: getCurrentCustomerCallback,
        getCurrentSubscriptionPlanProration: getCurrentSubscriptionPlanProrationCallback,
        setCurrentCustomer: setCurrentCustomerCallback,
        setCurrentCustomerSource: setCurrentCustomerSourceCallback,
        setCurrentSubscriptionPlan: setCurrentSubscriptionPlanCallback
    };
}