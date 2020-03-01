import { v4 as uuid } from 'uuid';
import { printDocument, printTable } from 'utils/PrintUtils';
import { getAlertFields } from 'data/DataAlertFields';
import { updateProcess } from 'actions/ThreadActions';
import { getInstanceFields } from 'data/DataInstanceFields';

export function printAlerts(alerts) {
    return (dispatch, getState) => {
        const state = getState();
        const fields = getAlertFields();

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
        const fields = getInstanceFields();

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
            state: 'ERROR',
            error: error.toString()
        }));

        throw error;
    }
}