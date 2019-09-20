import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import App from 'reducers/App';
import Notes from 'reducers/Notes';
import Objects from 'reducers/Objects';
import Session from 'reducers/Session';
import Settings from 'reducers/Settings';
import Synchronization from 'reducers/Synchronization';
import Tasks from 'reducers/Tasks';
import Thread from 'reducers/Thread';

export default combineReducers({
    app: App(),
    contexts: Objects('contexts'),
    session: Session(),
    settings: Settings(),
    taskFilters: Objects('taskFilters'),
    thread: Thread()
});