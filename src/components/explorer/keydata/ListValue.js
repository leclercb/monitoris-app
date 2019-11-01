import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import ValueTable from 'components/explorer/keydata/ValueTable';
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
            ].map(item => ({
                id: item
            })));
            setEndIndex(endIndex + BATCH_SIZE);
        }
    };

    const fetchNextItems = async () => {
        await getItems();
    };

    const updateItem = (item, rowIndex) => {
        console.log(item, rowIndex);
    };

    useEffect(() => {
        setItems([]);
        setEndIndex(0);
        getItems();
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const fields = [
        {
            static: true,
            id: 'id',
            title: 'Value',
            type: 'text',
            editable: true
        }
    ];

    return (
        <React.Fragment>
            <ValueTable
                fields={fields}
                items={items}
                updateItem={updateItem}
                orderSettingPrefix="listValueColumnOrder_"
                widthSettingPrefix="listValueColumnWidth_" />
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