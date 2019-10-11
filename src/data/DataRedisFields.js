import { addColorsToArray } from 'utils/ColorUtils';

export function getRedisField(fieldId) {
    return getRedisFields().find(field => field.id === fieldId);
}

export function getRedisFields() {
    return addColorsToArray([
        {
            static: true,
            id: 'connected_clients',
            title: 'Connected Clients',
            type: 'number',
            editable: true,
            visible: true
        }
    ]);
}