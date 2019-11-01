import React from 'react';
import Terminal from 'components/common/Terminal';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function TerminalTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;

    return (
        <div style={{ display: 'flex', minHeight: '100%', padding: 25 }}>
            <div style={{ flex: 1, backgroundColor: '#000000', borderRadius: 5, padding: 25 }}>
                <Terminal
                    greetings="React Terminal - This is a limited terminal to enter simple redis commands"
                    interpreter={
                        async (command, term) => {
                            try {
                                if (!command) {
                                    return;
                                }

                                const args = command.split(/\s/);
                                const result = await instanceApi.executeCommand(instanceId, db, args[0], args.slice(1), true);

                                term.echo(result);
                            } catch (e) {
                                if (e.response && e.response.data) {
                                    term.echo(e.response.data);
                                } else {
                                    term.echo(e);
                                }
                            }
                        }
                    } />
            </div>
        </div>
    );
}

export default TerminalTool;