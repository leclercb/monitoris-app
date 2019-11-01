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
            setKeys(result[1]);
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue);
            setScanResult(result);
            setKeys([
                ...keys,
                ...result[1]
            ]);
        }
    };

    const deleteSelectedKeys = async () => {
        await instanceApi.executeCommand(instanceId, db, 'del', selectedKeys);
        setKeys(keys.filter(key => !selectedKeys.includes(key)));
        setSelectedKeys([]);
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <div style={{ width: '100%', padding: 10 }}>
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
                <div style={{ width: '100%', padding: 10 }}>
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
                <div style={{ flex: 1, width: '100%', padding: 10 }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={keys.length}
                                rowHeight={30}
                                rowRenderer={({ index, key, style }) => {
                                    const value = keys[index];
                                    const selected = selectedKeys.includes(value);

                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelectedKeys([value])}
                                            style={{
                                                ...style,
                                                cursor: 'pointer',
                                                borderRadius: 5,
                                                backgroundColor: selected ? '#d2291f' : 'initial',
                                                color: selected ? '#ffffff' : 'initial',
                                                display: 'flex',
                                                padding: '0px 10px',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                            <span style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{value}</span>
                                        </div>
                                    );
                                }}
                                style={{
                                    border: '1px solid #cccccc',
                                    borderRadius: 5,
                                    padding: 10,
                                    outline: 'none'
                                }}
                            />
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