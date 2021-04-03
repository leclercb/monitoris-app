export function getFields(condition, fields) {
    if (!condition) {
        return [];
    }

    if (condition.operator) {
        if (!condition.conditions || condition.conditions.length === 0) {
            return [];
        }

        const result = [];

        for (let i = 0; i < condition.conditions.length; i++) {
            result.push(...getFields(condition.conditions[i], fields));
        }

        return result;
    } else {
        const field = fields.find(field => field.id === condition.field);

        if (!field) {
            return [];
        }

        return [field.id];
    }
}