const App = () => (state = {
    editingCell: {
        objectId: null,
        fieldId: null
    },
    selectedDb: 0,
    selectedAlertId: null,
    selectedInstanceId: null,
    selectedDashboardId: null,
    selectedToolId: 'info',
    joyride: {
        id: null,
        run: false
    },
    accountManager: {
        visible: false
    },
    settingManager: {
        visible: false
    }
}, action) => {
    switch (action.type) {
        case 'SET_EDITING_CELL':
            return {
                ...state,
                editingCell: {
                    objectId: action.objectId,
                    fieldId: action.fieldId
                }
            };
        case 'SET_SELECTED_DB':
            return {
                ...state,
                selectedDb: action.db
            };
        case 'SET_SELECTED_ALERT_ID':
            return {
                ...state,
                selectedAlertId: action.alertId
            };
        case 'SET_SELECTED_INSTANCE_ID':
            return {
                ...state,
                selectedInstanceId: action.instanceId
            };
        case 'SET_SELECTED_DASHBOARD_ID':
            return {
                ...state,
                selectedDashboardId: action.dashboardId
            };
        case 'SET_SELECTED_TOOL_ID':
            return {
                ...state,
                selectedToolId: action.toolId
            };
        case 'SET_JOYRIDE_OPTIONS':
            return {
                ...state,
                joyride: {
                    id: 'id' in action ? action.id : state.joyride.id,
                    run: 'run' in action ? action.run : state.joyride.run
                }
            };
        case 'SET_ACCOUNT_MANAGER_OPTIONS':
            return {
                ...state,
                accountManager: {
                    visible: 'visible' in action ? action.visible : state.accountManager.visible
                }
            };
        case 'SET_SETTING_MANAGER_OPTIONS':
            return {
                ...state,
                settingManager: {
                    visible: 'visible' in action ? action.visible : state.settingManager.visible
                }
            };
        default:
            return state;
    }
};

export default App;