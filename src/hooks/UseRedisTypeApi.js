import { getRedisTypes } from '../data/DataRedisTypes';

export function useRedisTypeApi() {
    const types = getRedisTypes();

    return {
        types
    };
}