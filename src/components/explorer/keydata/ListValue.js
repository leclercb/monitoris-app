import React, { useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import Spacer from 'components/common/Spacer';
import ModalFieldForm from 'components/explorer/common/ModalFieldForm';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function ListValue({ redisKey, refresh }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [endIndex, setEndIndex] = useState(0);
    const [modalFieldFormVisible, setModalFieldFormVisible] = useState(false);

    const getItems = async (items, endIndex) => {
        if (instanceId && redisKey) {
            const result = await instanceApi.executeCommand(instanceId, db, 'lrange', [redisKey, endIndex, endIndex + BATCH_SIZE - 1]);
            setItems([
                ...items,
                ...result.map(item => ({
                    id: uuid(),
                    value: item
                }))
            ]);
            setEndIndex(endIndex + BATCH_SIZE);
        }
    };

    const fetchNextItems = async () => {
        await getItems(items, endIndex);
    };

    const addItem = async item => {
        await instanceApi.executeCommand(instanceId, db, 'rpush', [redisKey, item.value]);
        await refresh();
        await getItems([], 0);
        setModalFieldFormVisible(false);
    };

    const updateItem = async (item, rowIndex) => {
        await instanceApi.executeCommand(instanceId, db, 'lset', [redisKey, rowIndex, item.value]);
        await refresh();
        await getItems([], 0);
    };

    const deleteItems = async () => {
        const promises = selectedItemIds.map(id => {
            const item = items.find(item => item.id === id);
            return instanceApi.executeCommand(instanceId, db, 'lrem', [redisKey, 0, item.value]);
        });
        await Promise.all(promises);
        await refresh();
        await getItems([], 0);
    };

    useEffect(() => {
        setItems([]);
        setEndIndex(0);
        getItems([], 0);
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
        <Panel.Flex>
            <ModalFieldForm
                fields={fields}
                title={(<Icon icon="key" text="Add Element" />)}
                visible={modalFieldFormVisible}
                onOk={addItem}
                onCancel={() => setModalFieldFormVisible(false)} />
            <Panel.Grow>
                <ValueTable
                    fields={fields}
                    items={items}
                    updateItem={updateItem}
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    orderSettingPrefix="listValueColumnOrder_"
                    widthSettingPrefix="listValueColumnWidth_" />
            </Panel.Grow>
            <Panel.Standard>
                <div style={{ marginTop: 10 }}>
                    <Button
                        onClick={() => setModalFieldFormVisible(true)}>
                        <Icon icon="plus" text="Add Element" />
                    </Button>
                    <Spacer />
                    <Popconfirm
                        title={`Do you really want to delete ALL the elements containing the same values as the selected ones ?`}
                        onConfirm={deleteItems}
                        okText="Yes"
                        cancelText="No">
                        <Button>
                            <Icon icon="trash-alt" text="Remove Element(s)" />
                        </Button>
                    </Popconfirm>
                    <Button
                        onClick={fetchNextItems}
                        disabled={items.length < endIndex}
                        style={{ marginLeft: 5 }}>
                        Fetch next {BATCH_SIZE} items
            </Button>
                </div>
            </Panel.Standard>
        </Panel.Flex>
    );
}

ListValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
};

export default ListValue;