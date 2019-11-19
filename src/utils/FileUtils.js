export function getSizeFromFileSizeObject(object) {
    switch (object.unit) {
        case 'B': return object.value;
        case 'kB': return object.value * 1024;
        case 'MB': return object.value * 1024 * 1024;
        case 'GB': return object.value * 1024 * 1024 * 1024;
        case 'TB': return object.value * 1024 * 1024 * 1024 * 1024;
        default: return object.value;
    }
}

export function getFileSizeObject(size) {
    if (typeof size === 'undefined' || size === null) {
        size = 0;
    }

    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));

    return {
        value: size / Math.pow(1024, i),
        unit: ['B', 'kB', 'MB', 'GB', 'TB'][i]
    };
}

export function getHumanFileSize(size) {
    const object = getFileSizeObject(size);
    return `${object.value.toFixed(2)} ${object.unit}`;
}