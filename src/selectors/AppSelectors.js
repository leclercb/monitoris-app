import { createSelector } from 'reselect';
import { getSession } from 'selectors/SessionSelectors';

export const getEditingCell = state => state.app.editingCell;

export const getSelectedAlertId = state => state.app.selectedAlertId;
export const getSelectedInstanceId = state => state.app.selectedInstanceId;
export const getSelectedExplorerInstanceId = state => state.app.selectedExplorerInstanceId;
export const getSelectedExplorerToolId = state => state.app.selectedExplorerToolId;

export const getJoyrideOptions = state => state.app.joyride;

export const getCategoryManager = state => state.app.categoryManager;
export const getSettingManager = state => state.app.settingManager;

export const isPro = createSelector(
    getSession,
    (session) => {
        return session.user ? session.user.metaData.computedSubscriptionType === 'pro' : false;
    }
);