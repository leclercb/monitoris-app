import { createSelector } from 'reselect';
import { shallowEquals } from 'utils/ObjectUtils';

export const getSettings = state => state.settings;

export const getSettingsSelector = () => {
    let previousValue = {};

    return createSelector(
        getSettings,
        (state, pattern) => pattern instanceof RegExp ? pattern.source : pattern,
        (settings, pattern) => {
            const filteredSettings = Object.keys(settings).reduce((filteredSettings, key) => {
                if (key.match(pattern)) {
                    filteredSettings[key] = settings[key];
                }

                return filteredSettings;
            }, {});

            if (shallowEquals(previousValue, filteredSettings)) {
                return previousValue;
            }

            return filteredSettings;
        });
};

export const getSelectedView = state => state.settings.selectedView;