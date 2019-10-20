import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentCustomer } from 'actions/StripeActions';

export function useStripeApi() {
    const dispatch = useDispatch();

    const getCurrentCustomerCallback = useCallback(
        () => dispatch(getCurrentCustomer()),
        [dispatch]
    );

    return {
        getCurrentCustomer: getCurrentCustomerCallback
    };
}