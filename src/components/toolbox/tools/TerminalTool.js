import React from 'react';
import { Empty } from 'antd';
import Terminal from 'components/terminal/Terminal';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function TerminalTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;

    if (!instanceId) {
        return (<Empty description="Please select an instance" />);
    }

    const runCommand = async (command, parameters, print) => {
        const result = await instanceApi.executeCommand(instanceId, db, command, parameters);
        print(result);
    };

    return (
        <Terminal />
    );
}

export default TerminalTool;