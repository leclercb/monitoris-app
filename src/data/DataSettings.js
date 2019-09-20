import React from 'react';
import { Checkbox, Modal, Select, notification } from 'antd';
import moment from 'moment';
import { getUserDataPath } from 'actions/ActionUtils';
import { loadData, saveData, setNoteFieldManagerOptions, setTaskFieldManagerOptions } from 'actions/AppActions';
import { getBackups, restoreBackup } from 'actions/BackupActions';
import { testConnection } from 'actions/RequestActions';
import { resetDataForSynchronization, selectSynchronizationApp, synchronize } from 'actions/SynchronizationActions';
import FileField from 'components/common/FileField';
import ProLockedMessage from 'components/pro/ProLockedMessage';
import ProUnlockedMessage from 'components/pro/ProUnlockedMessage';
import { getPriorities } from 'data/DataPriorities';
import { getStatuses } from 'data/DataStatuses';
import { verifyLicense } from 'utils/LicenseUtils';
import { getSynchronizationApp } from 'utils/SynchronizationUtils';
import { checkLatestVersion } from 'utils/VersionUtils';

export function isCoreSetting(settingId) {
    return !!getCategories().find(category => {
        return category.settings.find(setting => {
            return setting.id === settingId && setting.core === true;
        });
    });
}

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

export function getCategorySettings(category, options = {}) {
    if (!category) {
        return [];
    }

    const settings = [...category.settings];

    const { noteFields, taskFields } = options;

    if (category.type === 'noteField' && noteFields) {
        noteFields.forEach(field => settings.push(category.createSetting(field)));
    }

    if (category.type === 'taskField' && taskFields) {
        taskFields.forEach(field => settings.push(category.createSetting(field)));
    }

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
                    id: 'showStartTime',
                    title: 'Show start time',
                    type: 'boolean',
                    value: false,
                    editable: true
                },
                {
                    id: 'showDueTime',
                    title: 'Show due time',
                    type: 'boolean',
                    value: false,
                    editable: true
                },
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
            id: 'taskFields',
            title: 'Task edition form',
            icon: 'columns',
            type: 'taskField',
            settings: [
                {
                    id: 'editCustomTaskFields',
                    title: 'Edit custom task fields',
                    type: 'button',
                    value: (settings, updateSettings, dispatch) => {
                        dispatch(setTaskFieldManagerOptions({ visible: true }));
                    },
                    editable: true
                },
                {
                    id: 'taskFieldVisible_id',
                    title: 'Show field "ID"',
                    type: 'boolean',
                    value: false,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskFieldVisible_creationDate',
                    title: 'Show field "Creation date"',
                    type: 'boolean',
                    value: false,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskFieldVisible_updateDate',
                    title: 'Show field "Update date"',
                    type: 'boolean',
                    value: false,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskFieldVisible_completionDate',
                    title: 'Show field "Completion date"',
                    type: 'boolean',
                    value: false,
                    editable: false,
                    visible: false
                }
            ],
            createSetting: field => ({
                id: `taskFieldVisible_${field.id}`,
                title: `Show field "${field.title}"`,
                type: 'boolean',
                value: true,
                editable: true
            })
        },
        {
            id: 'theme',
            title: 'Theme & Colors',
            icon: 'paint-roller',
            settings: [
                {
                    id: 'noteTableRowHeight',
                    title: 'Note Table - Row Height',
                    type: 'number',
                    value: 32,
                    editable: true,
                    options: {
                        min: 28,
                        max: 50
                    }
                },
                {
                    id: 'taskTableRowHeight',
                    title: 'Task Table - Row Height',
                    type: 'number',
                    value: 32,
                    editable: true,
                    options: {
                        min: 28,
                        max: 50
                    }
                },
                {
                    id: 'showImportanceColor',
                    title: 'Show importance color',
                    type: 'boolean',
                    value: true,
                    editable: true
                },
                {
                    id: 'resetDefaultColors',
                    title: 'Reset default colors',
                    type: 'button',
                    value: (settings, updateSettings) => {
                        updateSettings({
                            evenColor: '#fafafa',
                            oddColor: '#e8f1f7',
                            dueTodayForegroundColor: '#1b5e20',
                            overdueForegroundColor: '#b71c1c'
                        });
                    },
                    editable: true
                },
                {
                    id: 'evenColor',
                    title: 'Even color',
                    type: 'color',
                    value: '#fafafa',
                    editable: true
                },
                {
                    id: 'oddColor',
                    title: 'Odd color',
                    type: 'color',
                    value: '#e8f1f7',
                    editable: true
                },
                {
                    id: 'dueTodayForegroundColor',
                    title: 'Due today foreground color',
                    type: 'color',
                    value: '#1b5e20',
                    editable: true
                },
                {
                    id: 'overdueForegroundColor',
                    title: 'Overdue foreground color',
                    type: 'color',
                    value: '#b71c1c',
                    editable: true
                }
            ]
        },
        {
            id: 'priorityColors',
            title: 'Priority colors',
            icon: 'paint-roller',
            settings: getPriorities().map(priority => ({
                id: 'priority_' + priority.id,
                title: 'Priority ' + priority.title,
                type: 'color',
                value: priority.color,
                editable: true
            }))
        },
        {
            id: 'window',
            title: 'Window',
            icon: 'desktop',
            settings: [
                {
                    id: 'selectedView',
                    title: 'Selected view',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'Calendar',
                                value: 'taskCalendar'
                            },
                            {
                                title: 'Notes',
                                value: 'note'
                            },
                            {
                                title: 'Tasks',
                                value: 'task'
                            }
                        ]
                    },
                    value: 'task',
                    editable: false,
                    visible: false
                },
                {
                    id: 'selectedCalendarView',
                    title: 'Selected calendar view',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'Agenda',
                                value: 'agenda'
                            },
                            {
                                title: 'Day',
                                value: 'day'
                            },
                            {
                                title: 'Month',
                                value: 'month'
                            },
                            {
                                title: 'Week',
                                value: 'week'
                            },
                            {
                                title: 'Work week',
                                value: 'work_week'
                            }
                        ]
                    },
                    value: 'month',
                    editable: false,
                    visible: false
                },
                {
                    id: 'showCompletedTasks',
                    title: 'Show completed tasks',
                    type: 'boolean',
                    value: true,
                    editable: false,
                    visible: false
                },
                {
                    id: 'calendarDateMode',
                    title: 'Calendar date mode',
                    type: 'select',
                    options: {
                        values: [
                            {
                                title: 'Both',
                                value: 'both'
                            },
                            {
                                title: 'Due date',
                                value: 'dueDate'
                            },
                            {
                                title: 'Start date',
                                value: 'startDate'
                            }
                        ]
                    },
                    value: 'both',
                    editable: false,
                    visible: false
                },
                {
                    id: 'windowSizeWidth',
                    title: 'Window size - Width',
                    type: 'number',
                    value: 1024,
                    editable: false,
                    visible: false,
                    core: true,
                    mode: 'electron'
                },
                {
                    id: 'windowSizeHeight',
                    title: 'Window size - Height',
                    type: 'number',
                    value: 768,
                    editable: false,
                    visible: false,
                    core: true,
                    mode: 'electron'
                },
                {
                    id: 'windowPositionX',
                    title: 'Window position - X',
                    type: 'number',
                    value: null,
                    editable: false,
                    visible: false,
                    core: true,
                    mode: 'electron'
                },
                {
                    id: 'windowPositionY',
                    title: 'Window position - Y',
                    type: 'number',
                    value: null,
                    editable: false,
                    visible: false,
                    core: true,
                    mode: 'electron'
                },
                {
                    id: 'noteViewSplitPaneSize',
                    title: 'Note view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'noteViewSubSplitPaneSize',
                    title: 'Note view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'noteViewSubSplitPaneMode',
                    title: 'Note view split pane mode',
                    type: 'select',
                    value: 'horizontal',
                    editable: true,
                    options: {
                        values: [
                            {
                                title: 'Horizontal',
                                value: 'horizontal'
                            },
                            {
                                title: 'Vertical',
                                value: 'vertical'
                            }
                        ]
                    }
                },
                {
                    id: 'taskViewSplitPaneSize',
                    title: 'Task view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskViewSubSplitPaneSize',
                    title: 'Task view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskViewSubSplitPaneMode',
                    title: 'Task view split pane mode',
                    type: 'select',
                    value: 'horizontal',
                    editable: true,
                    options: {
                        values: [
                            {
                                title: 'Horizontal',
                                value: 'horizontal'
                            },
                            {
                                title: 'Vertical',
                                value: 'vertical'
                            }
                        ]
                    }
                },
                {
                    id: 'taskCalendarViewSplitPaneSize',
                    title: 'Task calendar view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskCalendarViewSubSplitPaneSize',
                    title: 'Task calendar view split pane size',
                    type: 'number',
                    value: 300,
                    editable: false,
                    visible: false
                },
                {
                    id: 'taskCalendarViewSubSplitPaneMode',
                    title: 'Task calendar view split pane mode',
                    type: 'select',
                    value: 'horizontal',
                    editable: true,
                    options: {
                        values: [
                            {
                                title: 'Horizontal',
                                value: 'horizontal'
                            },
                            {
                                title: 'Vertical',
                                value: 'vertical'
                            }
                        ]
                    }
                }
            ]
        }
    ];
}