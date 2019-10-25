import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCurrentCustomer,
    getCurrentSubscriptionPlanProration,
    getPlans,
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
        (planId, quantity) => dispatch(getCurrentSubscriptionPlanProration(planId, quantity)),
        [dispatch]
    );

    const getPlansCallback = useCallback(
        productId => dispatch(getPlans(productId)),
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
        (planId, quantity) => dispatch(setCurrentSubscriptionPlan(planId, quantity)),
        [dispatch]
    );

    return {
        getCurrentCustomer: getCurrentCustomerCallback,
        getCurrentSubscriptionPlanProration: getCurrentSubscriptionPlanProrationCallback,
        getPlans: getPlansCallback,
        setCurrentCustomer: setCurrentCustomerCallback,
        setCurrentCustomerSource: setCurrentCustomerSourceCallback,
        setCurrentSubscriptionPlan: setCurrentSubscriptionPlanCallback
    };
}