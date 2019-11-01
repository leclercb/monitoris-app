import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import LeftRight from 'components/common/LeftRight';

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

    useEffect(() => {
        setItems([]);
        setScanResult(null);
        scan(searchValue);
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
            render: key => <strong>{key}</strong> // eslint-disable-line react/display-name
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        }
    ];

    return (
        <React.Fragment>
            <Table
                rowKey="field"
                dataSource={items}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    size: 'small'
                }}
                size="small"
                style={{ marginBottom: 10 }} />
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