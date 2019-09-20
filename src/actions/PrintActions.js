import sortBy from 'lodash/sortBy';
import uuid from 'uuid/v4';
import { updateProcess } from 'actions/ThreadActions';
import { getSettings } from 'selectors/SettingSelectors';
import { printDocument, printTable } from 'utils/PrintUtils';

export function printAlerts(alerts) {
    return (dispatch, getState) => {
        const state = getState();
        const fields = [];

        return printObjects(
            dispatch,
            state,
            fields,
            alerts,
            'alerts.pdf',
            'Alerts',
            'Print alerts');
    };
}

export function printInstances(instances) {
    return (dispatch, getState) => {
        const state = getState();
        const fields = [];

        return printObjects(
            dispatch,
            state,
            fields,
            instances,
            'instances.pdf',
            'Instances',
            'Print instances');
    };
}

async function printObjects(dispatch, state, fields, objects, fileName, documentTitle, processTitle) {
    const processId = uuid();

    dispatch(updateProcess({
        id: processId,
        state: 'RUNNING',
        title: processTitle
    }));

    try {
        const doc = printDocument(documentTitle, 'l');
        printTable(doc, null, fields, objects, state);
        doc.save(fileName);

        dispatch(updateProcess({
            id: processId,
            state: 'COMPLETED'
        }));
    } catch (error) {
        dispatch(updateProcess({
            id: processId,
            state: 'ERROR'
        }));

        throw error;
    }
}