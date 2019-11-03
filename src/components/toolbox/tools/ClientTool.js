import React, { useEffect, useState } from 'react';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import ClientTable from 'components/toolbox/tools/ClientTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { parseRedisString } from 'utils/FormatUtils';

function ClientTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        if (instanceId) {
            const clients = await instanceApi.executeCommand(instanceId, db, 'client', ['list']);
            setClients(parseRedisString(clients));
        }
    };

    useEffect(() => {
        getClients();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    const refresh = async () => {
        await getClients();
    };

    return (
        <React.Fragment>
            <Panel.Sub grow>
                <ClientTable
                    clients={clients}
                    orderSettingPrefix="clientColumnOrder_"
                    widthSettingPrefix="clientColumnWidth_" />
            </Panel.Sub>
            <Panel.Sub>
                <PromiseButton
                    onClick={refresh}
                    style={{ marginLeft: 10 }}>
                    Refresh
            </PromiseButton>
            </Panel.Sub>
        </React.Fragment>
    );
}

export default ClientTool;