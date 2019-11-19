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
            id: 'total_commands_processed',
            title: 'Total Commands Processed',
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
        },
        {
            static: true,
            id: 'total_net_input_bytes',
            title: 'Total Net Input Bytes',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'total_net_output_bytes',
            title: 'Total Net Output Bytes',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'total_system_memory',
            title: 'Total System Memory',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'uptime_in_days',
            title: 'Uptime in Days',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'uptime_in_seconds',
            title: 'Uptime in Seconds',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_cpu_sys',
            title: 'Used CPU System',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_cpu_sys_children',
            title: 'Used CPU System Children',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_cpu_user',
            title: 'Used CPU User',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_cpu_user_children',
            title: 'Used CPU User Children',
            type: 'number',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory',
            title: 'Used Memory',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_dataset',
            title: 'Used Memory Dataset',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_lua',
            title: 'Used Memory LUA',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_overhead',
            title: 'Used Memory Overhead',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_peak',
            title: 'Used Memory Peak',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_rss',
            title: 'Used Memory RSS',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_scripts',
            title: 'Used Memory Scripts',
            type: 'fileSize',
            editable: true,
            visible: true
        },
        {
            static: true,
            id: 'used_memory_startup',
            title: 'Used Memory Startup',
            type: 'fileSize',
            editable: true,
            visible: true
        }
    ]);
}