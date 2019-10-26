import { addColorsToArray } from 'utils/ColorUtils';

export function getRedisField(fieldId) {
    return getRedisFields().find(field => field.id === fieldId);
}

export function getRedisFields() {
    return addColorsToArray([
        {
            static: true,
            id: 'blocked_clients',
            title: 'Blocked Clients',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'connected_clients',
            title: 'Connected Clients',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'connected_slaves',
            title: 'Connected Slaves',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'rejected_connections',
            title: 'Rejected Connections',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'total_connections_received',
            title: 'Total Connections Received',
            type: 'number',
            editable: true,
            visible: true
        }
    ]);
}