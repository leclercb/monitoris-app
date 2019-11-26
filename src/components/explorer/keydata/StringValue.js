import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Panel from 'components/common/Panel';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function StringValue({ redisKey, refresh, length }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [edit, setEdit] = useState(false);
    const [language, setLanguage] = useState('json');
    const [value, setValue] = useState(null);
    const [newValue, setNewValue] = useState(null);

    const getValue = async () => {
        if (instanceId && redisKey) {
            if (Number.parseInt(length) > 1024) {
                setValue('[Value is too big]');
                setNewValue(null);
            } else {
                const value = await instanceApi.executeCommand(instanceId, db, 'get', [redisKey]);
                setValue(value);
                setNewValue(value);
            }
        }
    };

    const onEdit = async () => {
        await instanceApi.executeCommand(instanceId, db, 'set', [redisKey, newValue]);
        await refresh();
        setValue(newValue);
        setEdit(false);
    };

    useEffect(() => {
        setValue(null);
        getValue();
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    if (edit) {
        return (
            <React.Fragment>
                <Panel.Grow>
                    <Input.TextArea defaultValue={newValue} onChange={event => setNewValue(event.target.value)} />
                </Panel.Grow>
                <Panel.Standard>
                    <Button
                        onClick={onEdit}
                        style={{ marginTop: 10 }}>
                        Save
                </Button>
                    <Button
                        onClick={() => setEdit(false)}
                        style={{ marginTop: 10, marginLeft: 10 }}>
                        Cancel
                </Button>
                </Panel.Standard>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Panel.Grow>
                <SyntaxHighlighter
                    language={language}
                    style={atomOneLight}
                    customStyle={{
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap',
                        flex: 1
                    }}>
                    {value || ''}
                </SyntaxHighlighter>
            </Panel.Grow>
            <Panel.Standard>
                <Button
                    onClick={() => setEdit(true)}
                    style={{ marginTop: 10 }}>
                    Edit
                </Button>
                <Select
                    placeholder="Language"
                    value={language}
                    onChange={language => setLanguage(language)}
                    style={{
                        width: 80,
                        marginLeft: 10
                    }}>
                    <Select.Option value="json">JSON</Select.Option>
                    <Select.Option value="xml">XML</Select.Option>
                </Select>
            </Panel.Standard>
        </React.Fragment>
    );
}

StringValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired,
    length: PropTypes.number
};

export default StringValue;