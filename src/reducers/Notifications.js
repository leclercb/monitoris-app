const Notifications = () => (state = {
    limits: null
}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION_LIMITS':
            return {
                ...state,
                limits: action.limits
            };
        default:
            return state;
    }
};

export default Notifications;