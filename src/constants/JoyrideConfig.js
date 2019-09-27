export function getConfig(id) {
    switch (id) {
        case 'appLayout': return getAppLayoutConfig();
        default: return null;
    }
}

export function getAppLayoutConfig() {
    return {
        continuous: true,
        steps: [
            {
                target: '.joyride-task-sider',
                placement: 'right',
                content: 'This is the task sider. It contains the list of filters you can apply to your tasks and the categories to organize them.'
            },
            {
                target: '.joyride-task-table',
                placement: 'bottom',
                content: 'This is the task table. It contains your tasks, filtered by the selected filter in the task sider'
            }
        ]
    };
}