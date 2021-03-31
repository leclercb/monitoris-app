import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadData,
    setAccountManagerOptions,
    setEditingCell,
    setSelectedDashboardId,
    setSelectedGraphId,
    setSelectedToolId,
    setSettingManagerOptions
} from 'actions/AppActions';
import { setSelectedView } from 'actions/SettingActions';
import {
    getAccountManager,
    getEditingCell,
    getSelectedDashboardId,
    getSelectedGraphId,
    getSelectedToolId,
    getSettingManager,
    isPro
} from 'selectors/AppSelectors';
import { getSelectedView } from 'selectors/SettingSelectors';
import { checkIsBusy } from 'actions/ThreadActions';

export function useAppApi() {
    const dispatch = useDispatch();

    const pro = useSelector(isPro);
    const selectedView = useSelector(getSelectedView);
    const selectedDashboardId = useSelector(getSelectedDashboardId);
    const selectedGraphId = useSelector(getSelectedGraphId);
    const selectedToolId = useSelector(getSelectedToolId);
    const editingCell = useSelector(getEditingCell);
    const accountManager = useSelector(getAccountManager);
    const settingManager = useSelector(getSettingManager);

    const loadDataCallback = useCallback(
        () => dispatch(loadData()),
        [dispatch]
    );

    const setSelectedViewCallback = useCallback(
        view => dispatch(setSelectedView(view)),
        [dispatch]
    );

    const setSelectedDashboardIdCallback = useCallback(
        toolId => dispatch(setSelectedDashboardId(toolId)),
        [dispatch]
    );

    const setSelectedGraphIdCallback = useCallback(
        graphId => dispatch(setSelectedGraphId(graphId)),
        [dispatch]
    );

    const setSelectedToolIdCallback = useCallback(
        toolId => dispatch(setSelectedToolId(toolId)),
        [dispatch]
    );

    const setEditingCellCallback = useCallback(
        (objectId, fieldId) => dispatch(setEditingCell(objectId, fieldId)),
        [dispatch]
    );

    const setAccountManagerOptionsCallback = useCallback(
        options => dispatch(setAccountManagerOptions(options)),
        [dispatch]
    );

    const setSettingManagerOptionsCallback = useCallback(
        options => dispatch(setSettingManagerOptions(options)),
        [dispatch]
    );

    const checkIsBusyCallback = useCallback(
        (fn, silent) => dispatch(checkIsBusy(fn, silent)),
        [dispatch]
    );

    return {
        pro,
        selectedView,
        selectedDashboardId,
        selectedGraphId,
        selectedToolId,
        editingCell,
        accountManager,
        settingManager,
        loadData: loadDataCallback,
        setSelectedView: setSelectedViewCallback,
        setSelectedDashboardId: setSelectedDashboardIdCallback,
        setSelectedGraphId: setSelectedGraphIdCallback,
        setSelectedToolId: setSelectedToolIdCallback,
        setEditingCell: setEditingCellCallback,
        setAccountManagerOptions: setAccountManagerOptionsCallback,
        setSettingManagerOptions: setSettingManagerOptionsCallback,
        checkIsBusy: checkIsBusyCallback
    };
}