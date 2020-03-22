import moment from 'moment';

export function getSettingValues() {
    const settings = {};

    getCategories().forEach(category => {
        category.settings.forEach(setting => {
            switch (setting.type) {
                case 'button':
                case 'component':
                case 'label':
                    break;
                default:
                    settings[setting.id] = setting.value;
                    break;
            }
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
                                title: `DD/MM/YYYY (${moment().format('DD/MM/YYYY')})`,
                                value: 'DD/MM/YYYY'
                            },
                            {
                                title: `DD-MM-YYYY (${moment().format('DD-MM-YYYY')})`,
                                value: 'DD-MM-YYYY'
                            },
                            {
                                title: `DD.MM.YYYY (${moment().format('DD.MM.YYYY')})`,
                                value: 'DD.MM.YYYY'
                            },
                            {
                                title: `MM/DD/YYYY (${moment().format('MM/DD/YYYY')})`,
                                value: 'MM/DD/YYYY'
                            },
                            {
                                title: `MM-DD-YYYY (${moment().format('MM-DD-YYYY')})`,
                                value: 'MM-DD-YYYY'
                            },
                            {
                                title: `MM.DD.YYYY (${moment().format('MM.DD.YYYY')})`,
                                value: 'MM.DD.YYYY'
                            },
                            {
                                title: `YYYY/MM/DD (${moment().format('YYYY/MM/DD')})`,
                                value: 'YYYY/MM/DD'
                            },
                            {
                                title: `YYYY-MM-DD (${moment().format('YYYY-MM-DD')})`,
                                value: 'YYYY-MM-DD'
                            },
                            {
                                title: `YYYY.MM.DD (${moment().format('YYYY.MM.DD')})`,
                                value: 'YYYY.MM.DD'
                            },
                            {
                                title: `ddd DD/MM/YYYY (${moment().format('ddd DD/MM/YYYY')})`,
                                value: 'ddd DD/MM/YYYY'
                            },
                            {
                                title: `ddd DD-MM-YYYY (${moment().format('ddd DD-MM-YYYY')})`,
                                value: 'ddd DD-MM-YYYY'
                            },
                            {
                                title: `ddd DD.MM.YYYY (${moment().format('ddd DD.MM.YYYY')})`,
                                value: 'ddd DD.MM.YYYY'
                            },
                            {
                                title: `ddd MM/DD/YYYY (${moment().format('ddd MM/DD/YYYY')})`,
                                value: 'ddd MM/DD/YYYY'
                            },
                            {
                                title: `ddd MM-DD-YYYY (${moment().format('ddd MM-DD-YYYY')})`,
                                value: 'ddd MM-DD-YYYY'
                            },
                            {
                                title: `ddd MM.DD.YYYY (${moment().format('ddd MM.DD.YYYY')})`,
                                value: 'ddd MM.DD.YYYY'
                            },
                            {
                                title: `ddd YYYY/MM/DD (${moment().format('ddd YYYY/MM/DD')})`,
                                value: 'ddd YYYY/MM/DD'
                            },
                            {
                                title: `ddd YYYY-MM-DD (${moment().format('ddd YYYY-MM-DD')})`,
                                value: 'ddd YYYY-MM-DD'
                            },
                            {
                                title: `ddd YYYY.MM.DD (${moment().format('ddd YYYY.MM.DD')})`,
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
                                title: 'HH:mm:ss',
                                value: 'HH:mm:ss'
                            },
                            {
                                title: 'hh:mm:ss a',
                                value: 'hh:mm:ss a'
                            }
                        ]
                    },
                    value: 'HH:mm:ss',
                    editable: true
                }
            ]
        },
        {
            id: 'theme',
            title: 'Theme & Colors',
            icon: 'paint-roller',
            settings: [
                {
                    id: 'resetDefaultColors',
                    title: 'Reset default colors',
                    type: 'button',
                    value: (settings, updateSettings) => {
                        updateSettings({
                            evenColor: '#ffffff',
                            oddColor: '#fff3f0'
                        });
                    },
                    editable: true
                },
                {
                    id: 'evenColor',
                    title: 'Even color',
                    type: 'color',
                    value: '#ffffff',
                    editable: true
                },
                {
                    id: 'oddColor',
                    title: 'Odd color',
                    type: 'color',
                    value: '#fff3f0',
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
                                title: 'Alerts',
                                value: 'alerts'
                            },
                            {
                                title: 'Dashboards',
                                value: 'dashboards'
                            },
                            {
                                title: 'Explorer',
                                value: 'explorer'
                            },
                            {
                                title: 'Graphs',
                                value: 'graphs'
                            },
                            {
                                title: 'Instances',
                                value: 'instances'
                            },
                            {
                                title: 'Tools',
                                value: 'tools'
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
                    id: 'graphViewSplitPaneSize',
                    title: 'Graph view split pane size',
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
                },
                {
                    id: 'toolViewSplitPaneSize',
                    title: 'Tool view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                }
            ]
        }
    ];
}