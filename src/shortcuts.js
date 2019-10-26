import Mousetrap from 'mousetrap';
import { store } from 'store/Store';
import { addAlert } from 'actions/AlertActions';
import { setSelectedAlertId } from 'actions/AppActions';
import { setSelectedView } from 'actions/SettingActions';

export function initializeShortcuts() {
    Mousetrap.bind(['command+alt+a', 'ctrl+shift+a'], async () => {
        await executeAddAlert();
        return false;
    });
}

async function executeAddAlert() {
    await store.dispatch(setSelectedView('alert'));
    const alert = await store.dispatch(addAlert());
    await store.dispatch(setSelectedAlertId(alert.id));
}