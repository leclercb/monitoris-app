import { clone, removePrivateKeys } from 'utils/ObjectUtils';

const Objects = property => (state = [], action) => {
    if (action.property !== property) {
        return state;
    }

    switch (action.type) {
        case 'SET_OBJECTS': {
            return [...(action.objects || [])];
        }
        case 'CHANGE_ID': {
            return changeId(state, action);
        }
        case 'ADD_OBJECT': {
            return addObject(state, action);
        }
        case 'UPDATE_OBJECT': {
            return updateObject(state, action);
        }
        case 'DELETE_OBJECT': {
            const objectIds = Array.isArray(action.objectId) ? action.objectId : [action.objectId];
            return state.filter(object => !objectIds.includes(object.id));
        }
        default:
            return state;
    }
};

const changeId = (state, action) => {
    let newState = [...state];

    const index = newState.findIndex(object => object.id === action.oldId);

    if (index < 0) {
        throw Error(`The object with id "${action.oldId}" doesn't exist`);
    }

    if (newState.findIndex(object => object.id === action.newId) >= 0) {
        throw Error(`An object with id "${action.newId}" already exists`);
    }

    const oldObject = newState[index];

    const updatedObject = {
        ...oldObject,
        id: action.newId
    };

    newState[index] = updatedObject;

    return newState;
};

const addObject = (state, action) => {
    const newState = [...state];

    if (!action.object.id) {
        throw Error('The object doesn\'t have an ID');
    }

    const index = newState.findIndex(object => object.id === action.object.id);

    if (index >= 0) {
        throw Error(`The object with id "${action.object.id}" cannot be added as it already exists`);
    }

    const newObject = {
        ...clone(action.object),
        creationDate: action.creationDate,
        updateDate: action.creationDate
    };

    if (action.options.keepRefIds !== true) {
        newObject.refIds = {};
    }

    removePrivateKeys(newObject);

    newState.push(newObject);

    return newState;
};

const updateObject = (state, action) => {
    let newState = [...state];

    if (!action.object.id) {
        throw Error('The object doesn\'t have an ID');
    }

    const index = newState.findIndex(object => object.id === action.object.id);

    if (index < 0) {
        throw Error(`The object with id "${action.object.id}" cannot be updated as it doesn't exist`);
    }

    const oldObject = newState[index];

    const updatedObject = {
        ...action.object,
        creationDate: oldObject.creationDate,
        updateDate: action.updateDate
    };

    removePrivateKeys(updatedObject);

    newState[index] = updatedObject;

    return newState;
};

export default Objects;