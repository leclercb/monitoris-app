import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadData,
    setCategoryManagerOptions,
    setEditingCell,
    setSettingManagerOptions,
} from 'actions/AppActions';
import { setSelectedView } from 'actions/SettingActions';
import {
    getCategoryManager,
    getEditingCell,
    getSettingManager,
    isPro
} from 'selectors/AppSelectors';
import { getSelectedView } from 'selectors/SettingSelectors';

export function useAppApi() {
    const dispatch = useDispatch();

    const pro = useSelector(isPro);
    const selectedView = useSelector(getSelectedView);
    const editingCell = useSelector(getEditingCell);
    const categoryManager = useSelector(getCategoryManager);
    const settingManager = useSelector(getSettingManager);

    const loadDataCallback = useCallback(
        () => dispatch(loadData()),
        [dispatch]
    );

    const setSelectedViewCallback = useCallback(
        view => dispatch(setSelectedView(view)),
        [dispatch]
    );

    const setEditingCellCallback = useCallback(
        (objectId, fieldId) => dispatch(setEditingCell(objectId, fieldId)),
        [dispatch]
    );

    const setCategoryManagerOptionsCallback = useCallback(
        options => dispatch(setCategoryManagerOptions(options)),
        [dispatch]
    );

    const setSettingManagerOptionsCallback = useCallback(
        options => dispatch(setSettingManagerOptions(options)),
        [dispatch]
    );

    return {
        pro,
        selectedView,
        editingCell,
        categoryManager,
        settingManager,
        loadData: loadDataCallback,
        setSelectedView: setSelectedViewCallback,
        setEditingCell: setEditingCellCallback,
        setCategoryManagerOptions: setCategoryManagerOptionsCallback,
        setSettingManagerOptions: setSettingManagerOptionsCallback
    };
}