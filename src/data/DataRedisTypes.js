export function getRedisType(typeId) {
    return getRedisTypes().find(type => type.id === typeId);
}

export function getRedisTypeIndex(typeId) {
    return getRedisTypes().findIndex(type => type.id === typeId) || 0;
}

export function getRedisTypes() {
    return [
        {
            id: 'string',
            title: 'String',
            color: '#0dbf8a',
            icon: 'font'
        },
        {
            id: 'list',
            title: 'List',
            color: '#0daabf',
            icon: 'list-ol'
        },
        {
            id: 'set',
            title: 'Set',
            color: '#0d6fbf',
            icon: 'list-ul'
        },
        {
            id: 'hash',
            title: 'Hash',
            color: '#660dbf',
            icon: 'hashtag'
        }
    ];
}