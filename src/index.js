import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { notification } from 'antd';
import { configure } from 'Amplify';
import App from 'App';
import { initializeShortcuts } from 'shortcuts';
import LoadingIndicator from 'components/common/LoadingIndicator';
import PrivateComponent from 'components/common/PrivateComponent';
import { store } from 'store/Store';
import 'index.css';

configure();
initializeShortcuts();

window.addEventListener('error', function (e) {
    notification.error({
        message: 'An error occurred',
        description: e.error.message
    });

    return false;
});

ReactDOM.render(
    <Provider store={store}>
        <PrivateComponent>
            <React.Suspense fallback={(<LoadingIndicator />)}>
                <App />
            </React.Suspense>
        </PrivateComponent>
    </Provider>,
    document.getElementById('root'));