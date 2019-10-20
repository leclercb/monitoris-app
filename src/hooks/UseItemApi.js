import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from 'actions/ItemActions';

export function useItemApi() {
    const dispatch = useDispatch();

    const getItemCallback = useCallback(
        itemIdOrSku => dispatch(getItem(itemIdOrSku)),
        [dispatch]
    );

    return {
        getItem: getItemCallback
    };
}