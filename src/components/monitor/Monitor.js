import React, { useEffect, useState } from 'react';
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
    const status = instanceStateApi.status;

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
            <Icon icon="memory" text={getHumanFileSize(monitoring.used_memory)} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="key" text={monitoring.total_keys} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="users" text={monitoring.connected_clients} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="spinner" text={monitoring.instantaneous_ops_per_sec} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="tasks" text={monitoring.total_commands_processed} color="#ffffff" globalClassName="monitor-item" />
            <Icon icon="clock" text={monitoring.uptime_in_seconds} color="#ffffff" globalClassName="monitor-item" />
        </div>
    );
}

export default Monitor;