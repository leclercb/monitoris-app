import Mousetrap from 'mousetrap';
import { store } from 'store/Store';
import { setSelectedInstanceId } from 'actions/AppActions';
import { addInstance } from 'actions/InstanceActions';
import { setSelectedView } from 'actions/SettingActions';

export function initializeShortcuts() {
    Mousetrap.bind(['command+alt+i', 'ctrl+shift+i'], async () => {
        await executeAddInstance();
        return false;
    });
}

async function executeAddInstance() {
    await store.dispatch(setSelectedView('instance'));
    const instance = await store.dispatch(addInstance());
    await store.dispatch(setSelectedInstanceId(instance.id));
}