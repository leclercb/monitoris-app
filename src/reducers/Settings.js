import { getSettingValues } from 'data/DataSettings';

const Settings = () => (state = {
    ...getSettingValues()
}, action) => {
    switch (action.type) {
        case 'SET_SETTINGS': {
            return {
                ...getSettingValues(),
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