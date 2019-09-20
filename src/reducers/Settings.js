import { getSettings } from 'data/DataSettings';

const Settings = () => (state = {
    ...getSettings()
}, action) => {
    switch (action.type) {
        case 'SET_SETTINGS': {
            return {
                ...getSettings(),
                ...action.settings
            };
        }
        case 'UPDATE_SETTINGS': {
            return {
                ...state,
                ...action.settings
            };
        }
        default:
            return state;
    }
};

export default Settings;