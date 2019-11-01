import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function StringValue({ redisKey, length }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [edit, setEdit] = useState(false);
    const [language, setLanguage] = useState('json');
    const [value, setValue] = useState(null);
    const [newValue, setNewValue] = useState(null);

    useEffect(() => {
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

        setValue(null);
        getValue();
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const onEdit = () => {
        setEdit(true);
    };

    const onSave = async () => {
        await instanceApi.executeCommand(instanceId, db, 'set', [redisKey, newValue]);
        setValue(newValue);
        setEdit(false);
    };

    const onCancel = async () => {
        setEdit(false);
    };

    if (edit) {
        return (
            <React.Fragment>
                <Input.TextArea defaultValue={newValue} onChange={event => setNewValue(event.target.value)} />
                <Button
                    onClick={onSave}
                    style={{ marginTop: 10 }}>
                    Save
                </Button>
                <Button
                    onClick={onCancel}
                    style={{ marginTop: 10, marginLeft: 10 }}>
                    Cancel
                </Button>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <SyntaxHighlighter
                language={language}
                style={atomOneLight}
                customStyle={{
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
                }}>
                {value || ''}
            </SyntaxHighlighter>
            <Button
                onClick={onEdit}
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
        </React.Fragment>
    );
}

StringValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default StringValue;