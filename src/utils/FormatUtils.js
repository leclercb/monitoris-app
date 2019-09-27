export function parseRedisString(value) {
    const lines = value.split('\r\n');
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