import moment from 'moment';
import { isCoreSetting } from 'data/DataSettings';

export function filterSettings(settings, core) {
    const newSettings = {};

    Object.keys(settings).forEach(settingId => {
        if ((core && isCoreSetting(settingId)) || (!core && !isCoreSetting(settingId))) {
            newSettings[settingId] = settings[settingId];
            return;
        }
    });

    return newSettings;
}

export function formatDate(date, settings, showTime = true) {
    if (!showTime) {
        return moment(date).format(settings.dateFormat);
    }

    return moment(date).format(`${settings.dateFormat} ${settings.timeFormat}`);
}