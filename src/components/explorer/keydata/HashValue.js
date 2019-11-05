import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Panel from 'components/common/Panel';
import Spacer from 'components/common/Spacer';
import ModalFieldForm from 'components/explorer/common/ModalFieldForm';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function HashValue({ redisKey, refresh }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');
    const [modalFieldFormVisible, setModalFieldFormVisible] = useState(false);

    const executeScan = async (value, scanResult) => {
        const parameters = [redisKey, scanResult ? scanResult[0] : 0, 'MATCH', value, 'COUNT', BATCH_SIZE];
        const result = await instanceApi.executeCommand(instanceId, db, 'hscan', parameters);
        return result;
    };

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await executeScan(value, null);
            setScanResult(result);

            const resultItems = [];

            for (let i = 0; i < result[1].length; i += 2) {
                resultItems.push({
                    id: result[1][i],
                    field: result[1][i],
                    value: result[1][i + 1]
                });
            }

            setItems(resultItems);
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue, scanResult);
            setScanResult(result);

            const resultItems = [];

            for (let i = 0; i < result[1].length; i += 2) {
                resultItems.push({
                    id: result[1][i],
                    field: result[1][i],
                    value: result[1][i + 1]
                });
            }

            setItems([
                ...items,
                ...resultItems
            ]);
        }
    };

    const addItem = async item => {
        await instanceApi.executeCommand(instanceId, db, 'hset', [redisKey, item.field, item.value]);
        await refresh();
        await scan(searchValue);
        setModalFieldFormVisible(false);
    };

    const updateItem = async item => {
        if (item.id !== item.field) {
            await instanceApi.executeCommand(instanceId, db, 'hdel', [redisKey, item.id]);
        }

        await instanceApi.executeCommand(instanceId, db, 'hset', [redisKey, item.field, item.value]);

        await refresh();
        await scan(searchValue);
    };

    const deleteItems = async () => {
        const promises = selectedItemIds.map(id => instanceApi.executeCommand(instanceId, db, 'hdel', [redisKey, id]));
        await Promise.all(promises);
        await refresh();
        await scan(searchValue);
    };

    useEffect(() => {
        setItems([]);
        setScanResult(null);
        scan(searchValue);
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const fields = [
        {
            static: true,
            id: 'field',
            title: 'Field',
            type: 'text',
            editable: true
        },
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
                title={(<Icon icon="key" text="Add Item" />)}
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
                    orderSettingPrefix="hashValueColumnOrder_"
                    widthSettingPrefix="hashValueColumnWidth_" />
            </Panel.Grow>
            <Panel.Standard>
                <div style={{ marginTop: 10 }}>
                    <Button
                        onClick={() => setModalFieldFormVisible(true)}>
                        <Icon icon="plus" text="Add Item" />
                    </Button>
                    <Spacer />
                    <Popconfirm
                        title={`Do you really want to delete the selected items ?`}
                        onConfirm={deleteItems}
                        okText="Yes"
                        cancelText="No">
                        <Button>
                            <Icon icon="trash-alt" text="Remove Selected Item(s)" />
                        </Button>
                    </Popconfirm>
                </div>
            </Panel.Standard>
            <Panel.Standard>
                <div style={{ marginTop: 10 }}>
                    <LeftRight right={(
                        <Button
                            onClick={continueScanning}
                            disabled={!scanResult || scanResult[0] === '0'}
                            style={{ marginLeft: 10 }}>
                            Continue Scanning
                    </Button>
                    )}>
                        <Input.Search
                            placeholder="Pattern"
                            allowClear={true}
                            defaultValue={searchValue}
                            onSearch={value => scan(value)} />
                    </LeftRight>
                </div>
            </Panel.Standard>
        </Panel.Flex>
    );
}

HashValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
};

export default HashValue;