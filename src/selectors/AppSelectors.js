import { createSelector } from 'reselect';
import { getSession } from 'selectors/SessionSelectors';

export const getEditingCell = state => state.app.editingCell;

export const getSelectedDb = state => state.app.selectedDb;
export const getSelectedAlertId = state => state.app.selectedAlertId;
export const getSelectedInstanceId = state => state.app.selectedInstanceId;
export const getSelectedDashboardId = state => state.app.selectedDashboardId;
export const getSelectedToolId = state => state.app.selectedToolId;

export const getJoyrideOptions = state => state.app.joyride;

export const getAccountManager = state => state.app.accountManager;
export const getSettingManager = state => state.app.settingManager;

export const isPro = createSelector(
    getSession,
    (session) => {
        return session.user ? session.user.metaData.subscriptionInfo.type === 'pro' : false;
    }
);