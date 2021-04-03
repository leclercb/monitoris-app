import { getRedisFields } from '../data/DataRedisFields';

export function useRedisFieldApi() {
    const fields = getRedisFields();

    return {
        fields
    };
}