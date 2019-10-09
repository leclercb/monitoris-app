import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadData,
    setEditingCell,
    setSelectedDashboardId,
    setSelectedExplorerToolId,
    setSettingManagerOptions
} from 'actions/AppActions';
import { setSelectedView } from 'actions/SettingActions';
import {
    getEditingCell,
    getSelectedDashboardId,
    getSelectedExplorerToolId,
    getSettingManager,
    isPro
} from 'selectors/AppSelectors';
import { getSelectedView } from 'selectors/SettingSelectors';

export function useAppApi() {
    const dispatch = useDispatch();

    const pro = useSelector(isPro);
    const selectedView = useSelector(getSelectedView);
    const selectedDashboardId = useSelector(getSelectedDashboardId);
    const selectedExplorerToolId = useSelector(getSelectedExplorerToolId);
    const editingCell = useSelector(getEditingCell);
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

    const setSelectedExplorerToolIdCallback = useCallback(
        toolId => dispatch(setSelectedExplorerToolId(toolId)),
        [dispatch]
    );

    const setEditingCellCallback = useCallback(
        (objectId, fieldId) => dispatch(setEditingCell(objectId, fieldId)),
        [dispatch]
    );

    const setSettingManagerOptionsCallback = useCallback(
        options => dispatch(setSettingManagerOptions(options)),
        [dispatch]
    );

    return {
        pro,
        selectedView,
        selectedDashboardId,
        selectedExplorerToolId,
        editingCell,
        settingManager,
        loadData: loadDataCallback,
        setSelectedView: setSelectedViewCallback,
        setSelectedDashboardId: setSelectedDashboardIdCallback,
        setSelectedExplorerToolId: setSelectedExplorerToolIdCallback,
        setEditingCell: setEditingCellCallback,
        setSettingManagerOptions: setSettingManagerOptionsCallback
    };
}