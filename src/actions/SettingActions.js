import { loadFromServer } from 'actions/ActionUtils';
import { getSettings } from 'selectors/SettingSelectors';
import { merge } from 'utils/ObjectUtils';

export const loadSettingsFromServer = (core = false) => {
    return async dispatch => {
        const data = await dispatch(loadFromServer('settings', { skipSetLoaded: true }));
        await dispatch(setSettings(data.settings, core));
    };
};

export const setSettings = (settings, core = false) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_SETTINGS',
            core,
            settings
        });
    };
};

export function updateSettings(settings, options) {
    options = merge({
        skipServerUpdate: false,
        skipDiff: false
    }, options || {});

    return async (dispatch, getState) => {
        const oldSettings = getSettings(getState());

        await dispatch({
            type: 'UPDATE_SETTINGS',
            settings
        });

        const newSettings = getSettings(getState());

        await dispatch({
            type: 'POST_UPDATE_SETTINGS',
            settings,
            oldSettings,
            newSettings,
            options
        });

        return newSettings;
    };
}

export function setSelectedView(view) {
    return updateSettings({
        selectedView: view
    }, { skipServerUpdate: true });
}