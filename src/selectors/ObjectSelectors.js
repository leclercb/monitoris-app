export const getObjects = (state, property) => state[property];
export const getObjectById = (state, property, id) => getObjects(state, property).find(object => object.id === id);
export const getObjectsByIds = (state, property, ids) => getObjects(state, property).filter(object => ids.includes(object.id)).sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));