import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function ListValue({ redisKey, length }) {
    const batchSize = 100;
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const db = instanceApi.selectedExplorerDb;
    const [items, setItems] = useState([]);
    const [endIndex, setEndIndex] = useState(0);

    const getItems = async () => {
        if (instanceId && redisKey) {
            const value = await instanceApi.executeCommand(instanceId, db, 'lrange', [redisKey, String(endIndex), String(endIndex + batchSize - 1)]);
            setItems([
                ...items,
                ...value
            ]);
            setEndIndex(endIndex + batchSize - 1);
        }
    };

    useEffect(() => {
        setItems([]);
        setEndIndex(0);
        getItems();
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const fetchNextItems = async () => {
        await getItems();
    };

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
                Fetch next 5 items
            </Button>
        </React.Fragment>
    );
}

ListValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default ListValue;