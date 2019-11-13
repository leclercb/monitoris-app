export function parseRedisInfo(value) {
    if (!value) {
        return {};
    }

    const lines = value.split(/\r?\n/);
    const result = {};

    lines.forEach(line => {
        if (line.startsWith('#')) {
            return;
        }

        if (!line.includes(':')) {
            return;
        }

        const key = line.substring(0, line.indexOf(':'));
        const value = line.substring(line.indexOf(':') + 1);

        result[key] = value;
    });

    return result;
}

export function parseRedisString(value) {
    if (!value) {
        return [];
    }

    const lines = value.split(/\r?\n/);
    const result = [];

    lines.forEach(line => {
        const tokens = line.split(/\s/);
        const object = {};

        tokens.forEach(token => {
            if (!token) {
                return;
            }

            if (!token.includes('=')) {
                return;
            }

            const key = token.substring(0, token.indexOf('='));
            const value = token.substring(token.indexOf('=') + 1);

            object[key] = value;
        });

        if (Object.keys(object).length > 0) {
            result.push(object);
        }
    });

    return result;
}

export function parseRedisSubString(value) {
    if (!value) {
        return {};
    }

    const tokens = value.split(',');
    const result = {};

    tokens.forEach(token => {
        if (!token.includes('=')) {
            return;
        }

        const key = token.substring(0, token.indexOf('='));
        const value = token.substring(token.indexOf('=') + 1);

        result[key] = value;
    });

    return result;
}