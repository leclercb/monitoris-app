import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import LeftRight from 'components/common/LeftRight';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function SetValue({ redisKey }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');

    const executeScan = async value => {
        const parameters = [redisKey, scanResult ? scanResult[0] : '0', 'MATCH', value, 'COUNT', BATCH_SIZE];
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

    const updateItem = async (item, rowIndex) => {
        await instanceApi.executeCommand(instanceId, db, 'srem', [redisKey, item.id]);
        await instanceApi.executeCommand(instanceId, db, 'sadd', [redisKey, item.value]);

        item.id = item.value;

        const newItems = [...items];

        if (items.find(i => i.id === item.id)) {
            newItems.splice(rowIndex, 1);
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
            <ValueTable
                fields={fields}
                items={items}
                updateItem={updateItem}
                orderSettingPrefix="setValueColumnOrder_"
                widthSettingPrefix="setValueColumnWidth_" />
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
        </React.Fragment>
    );
}

SetValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default SetValue;