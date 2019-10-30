import React, { useEffect, useState } from 'react';
import { Button, Col, Empty, Input, Row, Table } from 'antd';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import KeyData from 'components/explorer/tools/keydata/KeyData';
import 'components/explorer/tools/ScanTool.css';

const BATCH_SIZE = 1000;

function ScanTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const db = instanceApi.selectedExplorerDb;
    const [keys, setKeys] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        setKeys([]);
        setScanResult(null);
        setSelectedKeys([]);
    }, [instanceId, db]);

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

    if (!instanceId) {
        return (<Empty description="Please select an instance" />);
    }

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: key => <strong>{key}</strong> // eslint-disable-line react/display-name
        }
    ];

    const dataSource = keys.map(key => ({ key }));

    return (
        <React.Fragment>
            <Input.Search
                placeholder="Key"
                allowClear={true}
                defaultValue={searchValue}
                onSearch={value => scan(value)}
                style={{
                    width: 400,
                    marginBottom: 20
                }} />
            <Button
                onClick={continueScanning}
                disabled={!scanResult || scanResult[0] === '0'}
                style={{ marginLeft: 10 }}>
                Continue Scanning
            </Button>
            <Row gutter={20}>
                <Col span={24} xxl={10}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={{
                            pageSize: 10,
                            size: 'small'
                        }}
                        size="small"
                        rowClassName={() => 'scan-table-row'}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: selectedKeys,
                            onChange: selectedRowKeys => setSelectedKeys(selectedRowKeys)
                        }}
                        onRow={record => ({
                            onClick: () => setSelectedKeys([record.key])
                        })}
                        footer={() => (
                            <React.Fragment>
                                <Button
                                    onClick={() => deleteSelectedKeys()}
                                    disabled={selectedKeys.length === 0 || selectedKeys.length > 100}>
                                    Delete
                                </Button>
                            </React.Fragment>
                        )} />
                </Col>
                {selectedKeys.length === 1 && (
                    <Col span={24} xxl={14}>
                        <KeyData redisKey={selectedKeys[0]} />
                    </Col>
                )}
            </Row>
        </React.Fragment>
    );
}

export default ScanTool;