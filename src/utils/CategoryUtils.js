export function filterByStatic(objects) {
    return objects.filter(object => !object.static);
}