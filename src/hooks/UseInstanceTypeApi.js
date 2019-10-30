import { getInstanceTypes } from '../data/DataInstanceTypes';

export function useInstanceTypeApi() {
    const types = getInstanceTypes();

    return {
        types
    };
}