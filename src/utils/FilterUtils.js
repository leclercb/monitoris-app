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
            getFields(condition.conditions[i], fields).forEach(f => {
                if (!result.includes(f)) {
                    result.push(f);
                }
            });
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