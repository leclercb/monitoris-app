import React, { useEffect, useRef } from 'react';
import Panel from 'components/common/Panel';
import Terminal from 'components/common/Terminal';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function TerminalTool() {
    const instanceApi = useInstanceApi();
    const instanceApiRef = useRef(null);

    useEffect(() => {
        instanceApiRef.current = instanceApi;
    });

    return (
        <Panel.Sub backgroundColor="#000000" grow>
            <Terminal
                greetings="Redis Terminal - This is a limited terminal to enter simple redis commands. Blocking commands are not supported."
                interpreter={async (command, term) => {
                    try {
                        if (!command) {
                            return;
                        }

                        const args = command.split(/\s/);

                        if (args.length === 2 && args[0].toUpperCase() === 'SELECT' && /^[0-9]+$/.test(args[1])) {
                            instanceApiRef.current.setSelectedDb(Number.parseInt(args[1]));
                            term.echo('OK');
                            return;
                        }

                        const result = await instanceApiRef.current.executeCommand(
                            instanceApiRef.current.selectedInstanceId,
                            instanceApiRef.current.selectedDb,
                            args[0],
                            args.slice(1),
                            true);

                        if (result) {
                            term.echo(result);
                        }
                    } catch (e) {
                        if (e.response && e.response.data) {
                            term.echo(e.response.data);
                        } else {
                            term.echo(e);
                        }
                    }
                }} />
        </Panel.Sub>
    );
}

export default TerminalTool;