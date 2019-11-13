import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Icon from 'components/common/Icon';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useInterval } from 'hooks/UseInterval';
import { getHumanFileSize } from 'utils/FileUtils';
import 'components/monitor/Monitor.css';

function Monitor() {
    const instanceApi = useInstanceApi();
    const instanceStateApi = useInstanceStateApi(instanceApi.selectedInstanceId);

    const instanceId = instanceApi.selectedInstanceId;
    const { status } = instanceStateApi;

    const [monitoring, setMonitoring] = useState(null);

    const refresh = async () => {
        if (instanceId && status && status.redisConnected) {
            const monitoring = await instanceApi.getMonitoring(instanceId, true);
            setMonitoring(monitoring);
        }
    };

    useInterval(refresh, 10000);

    useEffect(() => {
        if (instanceId && !status) {
            instanceApi.getStatus(instanceId);
        }

        setMonitoring(null);
        refresh();
    }, [instanceId, status]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!instanceId || !monitoring) {
        return <div className="monitor empty" />;
    }

    return (
        <div className="monitor">
            <Icon icon="server" text={instanceApi.selectedInstance.title} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="memory" text={`${getHumanFileSize(monitoring.used_memory)} used memory`} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="key" text={`${monitoring.total_keys} keys`} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="users" text={`${monitoring.connected_clients} connected clients`} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="spinner" text={`${monitoring.instantaneous_ops_per_sec} ops/sec`} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="tasks" text={`${monitoring.total_commands_processed} commands processed`} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="clock" text={`${moment.duration(monitoring.uptime_in_seconds * 1000).humanize()} uptime`} color="#ffffff" globalClassName="monitor-item" />
        </div>
    );
}

export default Monitor;