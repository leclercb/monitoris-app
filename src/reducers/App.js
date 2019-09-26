const App = () => (state = {
    editingCell: {
        objectId: null,
        fieldId: null
    },
    selectedAlertId: null,
    selectedInstanceId: null,
    selectedExplorerInstanceId: null,
    selectedExplorerToolId: null,
    joyride: {
        id: null,
        run: false
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
        case 'SET_SELECTED_EXPLORER_INSTANCE_ID':
            return {
                ...state,
                selectedExplorerInstanceId: action.instanceId
            };
        case 'SET_SELECTED_EXPLORER_TOOL_ID':
            return {
                ...state,
                selectedExplorerToolId: action.toolId
            };
        case 'SET_JOYRIDE_OPTIONS':
            return {
                ...state,
                joyride: {
                    id: 'id' in action ? action.id : state.joyride.id,
                    run: 'run' in action ? action.run : state.joyride.run
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