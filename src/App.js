import React, { useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import { useInterval } from 'hooks/UseInterval';
import HTML5Backend from 'react-dnd-html5-backend';
import AppLayout from 'components/layout/AppLayout';
import withJoyride from 'containers/WithJoyride';
import { useAppApi } from 'hooks/UseAppApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { checkLatestVersion } from 'utils/VersionUtils';

import 'App.css';
import 'font-awesome.js';
import 'rc-color-picker/assets/index.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-virtualized/styles.css';
import 'components/common/table/VirtualizedTable.css';

function App() {
    const appApi = useAppApi();
    const settingsApi = useSettingsApi();

    useEffect(() => {
        appApi.loadData();
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <AppLayout />
        </DndProvider>
    );
}

export default withJoyride(App);