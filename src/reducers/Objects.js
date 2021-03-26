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
        case 'ADD_OBJECTS': {
            return addObjects(state, action);
        }
        case 'UPDATE_OBJECTS': {
            return updateObjects(state, action);
        }
        case 'DELETE_OBJECTS': {
            return deleteObjects(state, action);
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

const addObjects = (state, action) => {
    const newState = [...state];

    for (let object of action.objects) {
        if (!object.id) {
            throw Error('The object doesn\'t have an ID');
        }

        const index = newState.findIndex(o => o.id === object.id);

        if (index >= 0) {
            throw Error(`The object with id "${object.id}" cannot be added as it already exists`);
        }

        const newObject = {
            ...clone(object),
            creationDate: action.creationDate,
            updateDate: action.creationDate
        };

        removePrivateKeys(newObject);

        newState.push(newObject);
    }

    return newState;
};

const updateObjects = (state, action) => {
    let newState = [...state];

    for (let object of action.objects) {
        if (!object.id) {
            throw Error('The object doesn\'t have an ID');
        }

        const index = newState.findIndex(o => o.id === object.id);

        if (index < 0) {
            throw Error(`The object with id "${object.id}" cannot be updated as it doesn't exist`);
        }

        const oldObject = newState[index];

        const updatedObject = {
            ...object,
            creationDate: oldObject.creationDate,
            updateDate: action.updateDate
        };

        removePrivateKeys(updatedObject);

        newState[index] = updatedObject;
    }

    return newState;
};

const deleteObjects = (state, action) => {
    const objectIds = action.objectIds;
    return state.filter(object => !objectIds.includes(object.id));
};

export default Objects;