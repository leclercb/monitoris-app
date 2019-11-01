import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, InputNumber, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import InstanceSelect from 'components/instances/common/InstanceSelect';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import 'components/explorer/sider/ExplorerSider.css';

const BATCH_SIZE = 1000;

function ExplorerSider({ selectedKeys, setSelectedKeys }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [keys, setKeys] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');

    useEffect(() => {
        setKeys([]);
        setScanResult(null);
        setSelectedKeys([]);
    }, [instanceId, db]); // eslint-disable-line react-hooks/exhaustive-deps

    const executeScan = async value => {
        const parameters = [scanResult ? scanResult[0] : '0', 'MATCH', value, 'COUNT', BATCH_SIZE];
        const result = await instanceApi.executeCommand(instanceId, db, 'scan', parameters);
        return result;
    };

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await executeScan(value);
            setScanResult(result);
            setKeys(result[1].sort());
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue);
            setScanResult(result);
            setKeys([
                ...keys,
                ...result[1]
            ].sort());
        }
    };

    const deleteSelectedKeys = async () => {
        await instanceApi.executeCommand(instanceId, db, 'del', selectedKeys);
        setKeys(keys.filter(key => !selectedKeys.includes(key)));
        setSelectedKeys([]);
    };

    return (
        <div className="explorer-sider">
            <div className="explorer-sider-element">
                <LeftRight right={(
                    <Tooltip title="Selected database" placement="right">
                        <InputNumber
                            value={instanceApi.selectedDb}
                            onChange={value => instanceApi.setSelectedDb(value)}
                            style={{ width: 60, minWidth: 60, marginLeft: 5 }} />
                    </Tooltip>
                )}>
                    <InstanceSelect
                        value={instanceApi.selectedInstanceId}
                        onChange={value => instanceApi.setSelectedInstanceId(value)}
                        placeholder="Select an instance..."
                        style={{ width: '100%' }} />
                </LeftRight>
            </div>
            {!instanceId && (
                <Empty description="Please select an instance" />
            )}
            {!!instanceId && (
                <div className="explorer-sider-element">
                    <LeftRight right={(
                        <Tooltip title="Continue Scanning" placement="right">
                            <Button
                                onClick={continueScanning}
                                disabled={!scanResult || scanResult[0] === '0'}
                                style={{ marginLeft: 5 }}>
                                <Icon icon="play" />
                            </Button>
                        </Tooltip>
                    )}>
                        <Input.Search
                            placeholder="Key"
                            allowClear={true}
                            defaultValue={searchValue}
                            onSearch={value => scan(value)}
                            style={{ width: '100%' }} />
                    </LeftRight>
                </div>
            )}
            {!!instanceId && (
                <div className="explorer-sider-element-grow">
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                className="explorer-list"
                                width={width}
                                height={height}
                                rowHeight={30}
                                rowCount={keys.length}
                                rowRenderer={({ index, key, style }) => {
                                    const value = keys[index];
                                    const selected = selectedKeys.includes(value);

                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelectedKeys([value])}
                                            className={`explorer-list-row ${selected ? 'selected' : ''}`}
                                            style={style}>
                                            <span>{value}</span>
                                        </div>
                                    );
                                }} />
                        )}
                    </AutoSizer>
                </div>
            )}
        </div>
    );
}

ExplorerSider.propTypes = {
    selectedKeys: PropTypes.array.isRequired,
    setSelectedKeys: PropTypes.func.isRequired
};

export default ExplorerSider;