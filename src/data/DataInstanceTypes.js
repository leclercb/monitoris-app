export function getInstanceType(typeId) {
    return getInstanceTypes().find(type => type.id === typeId);
}

export function getInstanceTypeIndex(typeId) {
    return getInstanceTypes().findIndex(type => type.id === typeId) || 0;
}

export function getInstanceTypes() {
    return [
        {
            id: 'direct',
            title: 'Direct',
            color: '#ebc634',
            icon: 'network-wired'
        },
        {
            id: 'proxy',
            title: 'Proxy',
            color: '#14b56a',
            icon: 'server'
        }
    ];
}