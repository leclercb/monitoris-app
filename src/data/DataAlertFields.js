import { addColorsToArray } from 'utils/ColorUtils';

export function getAlertFields() {
    return addColorsToArray([
        {
            static: true,
            id: 'id',
            title: 'ID',
            type: 'text',
            editable: false,
            visible: false
        },
        {
            static: true,
            id: 'creationDate',
            title: 'Creation date',
            type: 'dateTime',
            editable: false,
            visible: false
        },
        {
            static: true,
            id: 'updateDate',
            title: 'Update date',
            type: 'dateTime',
            editable: false,
            visible: false
        },
        {
            static: true,
            id: 'title',
            title: 'Title',
            type: 'text',
            editable: true
        },
        {
            static: true,
            id: 'color',
            title: 'Color',
            type: 'color',
            editable: true
        },
        {
            static: true,
            id: 'defaultSeverity',
            title: 'Default severity',
            type: 'severity',
            editable: true
        },
        {
            static: true,
            id: 'historySize',
            title: 'History Size',
            type: 'number',
            editable: true,
            options: {
                min: 10,
                max: 100
            }
        },
        {
            static: true,
            id: 'instances',
            title: 'Instances',
            type: 'instances',
            editable: true
        }
    ]);
}