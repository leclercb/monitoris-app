import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function StringValue({ redisKey, length }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(null);
    const [newValue, setNewValue] = useState(null);

    useEffect(() => {
        const getValue = async () => {
            if (instanceId && redisKey) {
                if (Number.parseInt(length) > 1024) {
                    setValue("[Value is too big]");
                    setNewValue(null);
                } else {
                    const value = await instanceApi.executeCommand(instanceId, 'get', [redisKey]);
                    setValue(value);
                    setNewValue(value);
                }
            }
        };

        setValue(null);
        getValue();
    }, [redisKey]);

    if (!redisKey) {
        return null;
    }

    const onEdit = () => {
        setEdit(true);
    };

    const onSave = async () => {
        await instanceApi.executeCommand(instanceId, 'set', [redisKey, newValue]);
        setValue(newValue);
        setEdit(false);
    };

    const onCancel = async () => {
        setEdit(false);
    };

    if (edit) {
        return (
            <React.Fragment>
                {edit ? (
                    <Input.TextArea defaultValue={newValue} onChange={event => setNewValue(event.target.value)} />
                ) : value}
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
            <Input.TextArea value={value} readOnly />
            <Button
                onClick={onEdit}
                style={{ marginTop: 10 }}>
                Edit
            </Button>
        </React.Fragment>
    );
}

StringValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
}

export default StringValue;