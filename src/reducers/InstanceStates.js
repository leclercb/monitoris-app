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
            info: null
        };
    }

    switch (action.type) {
        case 'SET_STATUS':
            newState[action.instanceId].status = action.status;

            return newState;
        case 'SET_INFO':
            newState[action.instanceId].info = {
                timestamp: action.timestamp,
                ...action.info
            };

            return newState;
        default:
            return state;
    }
};

export default InstanceStates;