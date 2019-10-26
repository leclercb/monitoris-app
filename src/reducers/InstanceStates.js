const InstanceStates = () => (state = {}, action) => {
    if (!action.instanceId) {
        return state;
    }

    const newState = {
        ...state
    };

    if (action.instanceId in newState) {
        newState[action.instanceId] = {
            ...newState[action.instanceId]
        };
    } else {
        newState[action.instanceId] = {
            status: null,
            info: []
        };
    }

    switch (action.type) {
        case 'SET_STATUS':
            newState[action.instanceId].status = action.status;

            return newState;
        case 'ADD_INFO':
            newState[action.instanceId].info = [
                ...newState[action.instanceId].info,
                action.info
            ];

            return newState;
        default:
            return state;
    }
};

export default InstanceStates;