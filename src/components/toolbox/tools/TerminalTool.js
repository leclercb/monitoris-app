import React from 'react';
import { Empty } from 'antd';
import Terminal from 'terminal-in-react';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import 'components/toolbox/tools/TerminalTool.css';

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
        <Terminal
            color='#6effe7'
            prompt='#6effe7'
            barColor='#141313'
            backgroundColor='#141313'
            promptSymbol='$'
            msg='This is a limited terminal where you can type redis commands.'
            commandPassThrough={(cmd, print) => {
                runCommand(cmd[0], cmd.slice(1), print);
            }}
            style={{
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 'bold'
            }}
            hideTopBar={true}
            allowTabs={false} />
    );
}

export default TerminalTool;