import React, { useEffect, useState } from 'react';
import moment from 'moment';
import LeftRight from 'components/common/LeftRight';
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

    return (
        <React.Fragment>
            <Panel.Sub>
                <LeftRight right={(
                    <span>{`Refreshed on: ${refreshDate ? refreshDate : 'never'}`}</span>
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
                    orderSettingPrefix="clientColumnOrder_"
                    widthSettingPrefix="clientColumnWidth_" />
            </Panel.Sub>
        </React.Fragment>
    );
}

export default ClientTool;