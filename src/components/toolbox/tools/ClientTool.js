import React, { useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import moment from 'moment';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import Spacer from 'components/common/Spacer';
import ClientTable from 'components/toolbox/tools/ClientTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { parseRedisString } from 'utils/FormatUtils';
import { formatDate } from 'utils/SettingUtils';

function ClientTool() {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;

    const [clients, setClients] = useState([]);
    const [selectedClientIds, setSelectedClientIds] = useState([]);
    const [refreshDate, setRefreshDate] = useState(null);

    const getClients = async () => {
        if (instanceId) {
            const clients = await instanceApi.executeCommand(instanceId, db, 'client', ['list']);
            setClients(parseRedisString(clients));
            setRefreshDate(moment().toISOString());
        }
    };

    useEffect(() => {
        getClients();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    const refresh = async () => {
        await getClients();
    };

    const onUnblock = async clientId => {
        await instanceApi.executeCommand(instanceId, db, 'client', ['unblock', clientId]);
    };

    const onKill = async clientId => {
        await instanceApi.executeCommand(instanceId, db, 'client', ['kill', 'id', clientId]);
    };

    return (
        <React.Fragment>
            <Panel.Sub>
                <LeftRight right={(
                    <span>{`Refreshed on: ${refreshDate ? formatDate(refreshDate, settingsApi.settings, true) : 'never'}`}</span>
                )}>
                    <PromiseButton
                        onClick={refresh}
                        style={{ marginLeft: 10 }}>
                        Refresh
                        </PromiseButton>
                </LeftRight>
            </Panel.Sub>
            <Panel.Sub grow>
                <ClientTable
                    clients={clients}
                    selectedClientIds={selectedClientIds}
                    setSelectedClientIds={setSelectedClientIds}
                    orderSettingPrefix="clientColumnOrder_"
                    widthSettingPrefix="clientColumnWidth_" />
            </Panel.Sub>
            <Panel.Sub>
                <Panel.Standard>
                    <Popconfirm
                        title={`Do you really want to unblock the client ${selectedClientIds[0]} ?`}
                        onConfirm={() => onUnblock(selectedClientIds[0])}
                        okText="Yes"
                        cancelText="No"
                        disabled={selectedClientIds.length === 0}>
                        <Button
                            disabled={selectedClientIds.length === 0}>
                            <Icon icon="trash-alt" text="Unblock" />
                        </Button>
                    </Popconfirm>
                    <Spacer />
                    <Popconfirm
                        title={`Do you really want to kill the client ${selectedClientIds[0]} ?`}
                        onConfirm={() => onKill(selectedClientIds[0])}
                        okText="Yes"
                        cancelText="No"
                        disabled={selectedClientIds.length === 0}>
                        <Button
                            disabled={selectedClientIds.length === 0}>
                            <Icon icon="trash-alt" text="Kill" />
                        </Button>
                    </Popconfirm>
                </Panel.Standard>
            </Panel.Sub>
        </React.Fragment>
    );
}

export default ClientTool;