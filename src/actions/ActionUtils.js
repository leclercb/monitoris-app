import { Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import { getConfig } from 'config/Config';
import { getErrorMessages } from 'utils/CloudUtils';

export function loadFromServer(property, options, params) {
    return async dispatch => {
        const processId = uuid();

        dispatch(updateProcess({
            id: processId,
            state: 'RUNNING',
            title: `Load "${property}" from server`
        }));

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'GET',
                    url: `${getConfig().apiUrl}/v1/${property}`,
                    params,
                    responseType: 'json'
                });

            dispatch(updateProcess({
                id: processId,
                state: 'COMPLETED'
            }));

            return result.data;
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                error: getErrorMessages(error, true)
            }));

            throw error;
        }
    };
}