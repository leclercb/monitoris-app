import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import LeftRight from 'components/common/LeftRight';
import ValueTable from 'components/explorer/keydata/ValueTable';

const BATCH_SIZE = 100;

function HashValue({ redisKey }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');

    const executeScan = async value => {
        const parameters = [redisKey, scanResult ? scanResult[0] : '0', 'MATCH', value, 'COUNT', BATCH_SIZE];
        const result = await instanceApi.executeCommand(instanceId, db, 'hscan', parameters);
        return result;
    };

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await executeScan(value);
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
            const result = await executeScan(searchValue);
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

    const updateItem = async (item, rowIndex) => {
        let fieldChanged = false;

        if (item.id !== item.field) {
            fieldChanged = true;
            await instanceApi.executeCommand(instanceId, db, 'hdel', [redisKey, item.id]);
        }

        await instanceApi.executeCommand(instanceId, db, 'hset', [redisKey, item.field, item.value]);

        item.id = item.field;

        const newItems = [...items];

        if (fieldChanged && items.find(i => i.id === item.id)) {
            newItems.splice(rowIndex, 1);
            items.find(i => i.id === item.id).value = item.value;
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
        <React.Fragment>
            <ValueTable
                fields={fields}
                items={items}
                updateItem={updateItem}
                orderSettingPrefix="hashValueColumnOrder_"
                widthSettingPrefix="hashValueColumnWidth_" />
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

HashValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default HashValue;