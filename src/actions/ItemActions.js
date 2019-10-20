import uuid from 'uuid/v4';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import { getConfig } from 'config/Config';

export function getItem(itemIdOrSku) {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest({
                method: 'GET',
                url: `${getConfig().apiUrl}/v1/items/${itemIdOrSku}`,
                responseType: 'json'
            });

            return result.data;
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                title: 'Get item information',
                error: error.toString()
            }));

            throw error;
        }
    };
}