import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import LeftRight from 'components/common/LeftRight';

const BATCH_SIZE = 100;

function SetValue({ redisKey }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const db = instanceApi.selectedExplorerDb;
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
            setItems(result[1]);
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue);
            setScanResult(result);
            setItems([
                ...items,
                ...result[1]
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

    return (
        <React.Fragment>
            <List
                dataSource={items}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                size="small"
                bordered
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

SetValue.propTypes = {
    redisKey: PropTypes.string,
    length: PropTypes.number
};

export default SetValue;