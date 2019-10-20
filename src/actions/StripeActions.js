import { Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import { getConfig } from 'config/Config';

export function getCurrentCustomer() {
    return async dispatch => {
        const processId = uuid();

        try {
            const result = await sendRequest({
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                },
                method: 'GET',
                url: `${getConfig().apiUrl}/v1/stripe/customers/current`,
                responseType: 'json'
            });

            return result.data;
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                title: 'Get customer information',
                error: error.toString()
            }));

            throw error;
        }
    };
}