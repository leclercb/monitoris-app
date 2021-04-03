import { addColorsToArray } from 'utils/ColorUtils';

export function getInfoItemFields() {
    return addColorsToArray([
        {
            static: true,
            id: 'field',
            title: 'Field',
            type: 'redisField',
            editable: true
        },
        {
            static: true,
            id: 'value',
            title: 'Value',
            type: 'text',
            editable: true
        }
    ]);
}