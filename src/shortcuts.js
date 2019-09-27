import Mousetrap from 'mousetrap';
import { store } from 'store/Store';
import { addAlert } from 'actions/AlertActions';
import { setSelectedAlertId, setSelectedInstanceId } from 'actions/AppActions';
import { addInstance } from 'actions/InstanceActions';
import { setSelectedView } from 'actions/SettingActions';

export function initializeShortcuts() {
    Mousetrap.bind(['command+alt+a', 'ctrl+alt+a'], async () => {
        await executeAddAlert();
        return false;
    });

    Mousetrap.bind(['command+alt+i', 'ctrl+alt+i'], async () => {
        await executeAddInstance();
        return false;
    });
}

async function executeAddAlert() {
    await store.dispatch(setSelectedView('alert'));
    const alert = await store.dispatch(addAlert());
    await store.dispatch(setSelectedAlertId(alert.id));
}

async function executeAddInstance() {
    await store.dispatch(setSelectedView('instance'));
    const instance = await store.dispatch(addInstance());
    await store.dispatch(setSelectedInstanceId(instance.id));
}