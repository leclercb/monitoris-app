import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import ModalFieldForm from 'components/explorer/common/ModalFieldForm';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function SetValue({ redisKey, length, setLength }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');
    const [modalFieldFormVisible, setModalFieldFormVisible] = useState(false);

    const executeScan = async value => {
        const parameters = [redisKey, scanResult ? scanResult[0] : 0, 'MATCH', value, 'COUNT', BATCH_SIZE];
        const result = await instanceApi.executeCommand(instanceId, db, 'sscan', parameters);
        return result;
    };

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await executeScan(value);
            setScanResult(result);
            setItems(result[1].map(item => ({
                id: item,
                value: item
            })));
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue);
            setScanResult(result);
            setItems([
                ...items,
                ...result[1]
            ].map(item => ({
                id: item,
                value: item
            })));
        }
    };

    const addItem = async (item) => {
        await instanceApi.executeCommand(instanceId, db, 'sadd', [redisKey, item.value]);

        item.id = item.value;

        const newItems = [...items];

        if (items.find(i => i.id === item.id)) {
            // Skip
        } else {
            newItems.push(item);
            setLength(length + 1);
        }

        setItems(newItems);

        setModalFieldFormVisible(false);
    };

    const updateItem = async (item, rowIndex) => {
        await instanceApi.executeCommand(instanceId, db, 'srem', [redisKey, item.id]);
        await instanceApi.executeCommand(instanceId, db, 'sadd', [redisKey, item.value]);

        item.id = item.value;

        const newItems = [...items];

        if (items.find(i => i.id === item.id)) {
            newItems.splice(rowIndex, 1);
            setLength(length - 1);
        } else {
            newItems[rowIndex] = item;
        }

        setItems(newItems);
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
                orderSettingPrefix="setValueColumnOrder_"
                widthSettingPrefix="setValueColumnWidth_" />
            <div style={{ marginTop: 10 }}>
                <Button
                    onClick={() => setModalFieldFormVisible(true)}>
                    <Icon icon="plus" text="Add Item" />
                </Button>
            </div>
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
        </React.Fragment>
    );
}

SetValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    length: PropTypes.number,
    setLength: PropTypes.func.isRequired
};

export default SetValue;