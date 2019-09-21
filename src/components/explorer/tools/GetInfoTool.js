import React, { useEffect, useState } from 'react';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function GetInfoTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            if (instanceId) {
                const info = await instanceApi.executeCommand(instanceId, 'INFO');
                setInfo(info);
            }
        };

        getInfo();
    }, [instanceId]);

    return (
        <span>{info}</span>
    );
}

export default GetInfoTool;