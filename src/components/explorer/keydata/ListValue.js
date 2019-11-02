import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import ModalFieldForm from 'components/explorer/common/ModalFieldForm';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function ListValue({ redisKey, length, setLength }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [endIndex, setEndIndex] = useState(0);
    const [modalFieldFormVisible, setModalFieldFormVisible] = useState(false);

    const getItems = async () => {
        if (instanceId && redisKey) {
            const result = await instanceApi.executeCommand(instanceId, db, 'lrange', [redisKey, String(endIndex), String(endIndex + BATCH_SIZE - 1)]);
            setItems([
                ...items,
                ...result
            ].map(item => ({
                id: item,
                value: item
            })));
            setEndIndex(endIndex + BATCH_SIZE);
        }
    };

    const fetchNextItems = async () => {
        await getItems();
    };

    const addItem = async (item) => {
        await instanceApi.executeCommand(instanceId, db, 'rpush', [redisKey, item.value]);

        item.id = item.value;

        setItems([...items, item]);
        setLength(length + 1);
        setModalFieldFormVisible(false);
    };

    const updateItem = async (item, rowIndex) => {
        await instanceApi.executeCommand(instanceId, db, 'lset', [redisKey, rowIndex, item.value]);

        item.id = item.value;

        const newItems = [...items];
        newItems[rowIndex] = item;
        setItems(newItems);
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
            id: 'value',
            title: 'Value',
            type: 'text',
            editable: true
        }
    ];

    return (
        <React.Fragment>
            <ModalFieldForm
                fields={fields}
                title={(<Icon icon="key" text="Add Item" />)}
                visible={modalFieldFormVisible}
                onOk={addItem}
                onCancel={() => setModalFieldFormVisible(false)} />
            <ValueTable
                fields={fields}
                items={items}
                updateItem={updateItem}
                orderSettingPrefix="listValueColumnOrder_"
                widthSettingPrefix="listValueColumnWidth_" />
            <div style={{ marginTop: 10 }}>
                <Button
                    onClick={() => setModalFieldFormVisible(true)}>
                    <Icon icon="plus" text="Add Item" />
                </Button>
                <Button
                    onClick={fetchNextItems}
                    disabled={items.length < endIndex}
                    style={{ marginLeft: 5 }}>
                    Fetch next {BATCH_SIZE} items
            </Button>
            </div>
        </React.Fragment>
    );
}

ListValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    length: PropTypes.number,
    setLength: PropTypes.func.isRequired
};

export default ListValue;