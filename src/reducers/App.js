const App = () => (state = {
    selectedAlertId: null,
    selectedInstanceId: null,
    joyride: {
        id: null,
        run: false
    },
    categoryManager: {
        visible: false,
        category: 'severities',
        objectId: null
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
        case 'SET_JOYRIDE_OPTIONS':
            return {
                ...state,
                joyride: {
                    id: 'id' in action ? action.id : state.joyride.id,
                    run: 'run' in action ? action.run : state.joyride.run
                }
            };
        case 'SET_CATEGORY_MANAGER_OPTIONS':
            return {
                ...state,
                categoryManager: {
                    visible: 'visible' in action ? action.visible : state.categoryManager.visible,
                    category: 'category' in action ? action.category : state.categoryManager.category,
                    objectId: 'objectId' in action ? action.objectId : state.categoryManager.objectId
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