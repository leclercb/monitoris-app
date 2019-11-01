import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function ListValue({ redisKey }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [endIndex, setEndIndex] = useState(0);

    const getItems = async () => {
        if (instanceId && redisKey) {
            const value = await instanceApi.executeCommand(instanceId, db, 'lrange', [redisKey, String(endIndex), String(endIndex + BATCH_SIZE - 1)]);
            setItems([
                ...items,
                ...value
            ]);
            setEndIndex(endIndex + BATCH_SIZE);
        }
    };

    const fetchNextItems = async () => {
        await getItems();
    };

    useEffect(() => {
        setItems([]);
        setEndIndex(0);
        getItems();
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    return (
        <React.Fragment>
            <List
                dataSource={items}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                size="small"
                bordered />
            <Button
                onClick={fetchNextItems}
                disabled={items.length < endIndex}
                style={{ marginTop: 10 }}>
                Fetch next {BATCH_SIZE} items
            </Button>
        </React.Fragment>
    );
}

ListValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default ListValue;