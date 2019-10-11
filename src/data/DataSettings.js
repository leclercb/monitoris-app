export function getSettings() {
    const settings = {};

    getCategories().forEach(category => {
        category.settings.forEach(setting => {
            if (setting.type === 'component') {
                return;
            }

            if (setting.type === 'button') {
                return;
            }

            if (setting.type === 'label') {
                return;
            }

            settings[setting.id] = setting.value;
        });
    });

    return settings;
}

export function getCategorySettings(category) {
    if (!category) {
        return [];
    }

    const settings = [...category.settings];

    return settings;
}

export function getCategories() {
    return [
        {
            id: 'date',
            title: 'Date',
            icon: 'calendar-alt',
            settings: [
                {
                    id: 'dateFormat',
                    title: 'Date format',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'DD/MM/YYYY (18/01/2019)',
                                value: 'DD/MM/YYYY'
                            },
                            {
                                title: 'DD-MM-YYYY (18-01-2019)',
                                value: 'DD-MM-YYYY'
                            },
                            {
                                title: 'DD.MM.YYYY (18.01.2019)',
                                value: 'DD.MM.YYYY'
                            },
                            {
                                title: 'MM/DD/YYYY (01/18/2019)',
                                value: 'MM/DD/YYYY'
                            },
                            {
                                title: 'MM-DD-YYYY (01-18-2019)',
                                value: 'MM-DD-YYYY'
                            },
                            {
                                title: 'MM.DD.YYYY (01.18.2019)',
                                value: 'MM.DD.YYYY'
                            },
                            {
                                title: 'YYYY/MM/DD (2019/01/18)',
                                value: 'YYYY/MM/DD'
                            },
                            {
                                title: 'YYYY-MM-DD (2019-01-18)',
                                value: 'YYYY-MM-DD'
                            },
                            {
                                title: 'YYYY.MM.DD (2019.01.18)',
                                value: 'YYYY.MM.DD'
                            },
                            {
                                title: 'ddd DD/MM/YYYY (Fri 18/01/2019)',
                                value: 'ddd DD/MM/YYYY'
                            },
                            {
                                title: 'ddd DD-MM-YYYY (Fri 18-01-2019)',
                                value: 'ddd DD-MM-YYYY'
                            },
                            {
                                title: 'ddd DD.MM.YYYY (Fri 18.01.2019)',
                                value: 'ddd DD.MM.YYYY'
                            },
                            {
                                title: 'ddd MM/DD/YYYY (Fri 01/18/2019)',
                                value: 'ddd MM/DD/YYYY'
                            },
                            {
                                title: 'ddd MM-DD-YYYY (Fri 01-18-2019)',
                                value: 'ddd MM-DD-YYYY'
                            },
                            {
                                title: 'ddd MM.DD.YYYY (Fri 01.18.2019)',
                                value: 'ddd MM.DD.YYYY'
                            },
                            {
                                title: 'ddd YYYY/MM/DD (Fri 2019/01/18)',
                                value: 'ddd YYYY/MM/DD'
                            },
                            {
                                title: 'ddd YYYY-MM-DD (Fri 2019-01-18)',
                                value: 'ddd YYYY-MM-DD'
                            },
                            {
                                title: 'ddd YYYY.MM.DD (Fri 2019.01.18)',
                                value: 'ddd YYYY.MM.DD'
                            }
                        ]
                    },
                    value: 'DD/MM/YYYY',
                    editable: true
                },
                {
                    id: 'timeFormat',
                    title: 'Time format',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'HH:mm',
                                value: 'HH:mm'
                            },
                            {
                                title: 'hh:mm a',
                                value: 'hh:mm a'
                            }
                        ]
                    },
                    value: 'HH:mm',
                    editable: true
                }
            ]
        },
        {
            id: 'window',
            title: 'Window',
            icon: 'desktop',
            settings: [
                {
                    id: 'showAlertsInBrowser',
                    title: 'Show alerts in browser',
                    type: 'boolean',
                    value: true,
                    editable: true,
                    visible: true
                },
                {
                    id: 'selectedView',
                    title: 'Selected view',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'Explorer',
                                value: 'explorer'
                            },
                            {
                                title: 'Alerts',
                                value: 'alert'
                            },
                            {
                                title: 'Instances',
                                value: 'instance'
                            }
                        ]
                    },
                    value: 'explorer',
                    editable: false,
                    visible: false
                },
                {
                    id: 'alertViewSplitPaneSize',
                    title: 'Alert view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'dashboardViewSplitPaneSize',
                    title: 'Dashboard view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'explorerViewSplitPaneSize',
                    title: 'Explorer view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'instanceViewSplitPaneSize',
                    title: 'Instance view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                }
            ]
        }
    ];
}