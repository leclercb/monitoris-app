import React, { useState } from 'react';
import { Button, Col, Empty, Input, Row, Table } from 'antd';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import KeyValue from 'components/explorer/tools/keyvalue/KeyValue';

function ScanTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [keys, setKeys] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [selectedKey, setSelectedKey] = useState(null);

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await instanceApi.executeCommand(instanceId, 'scan', [0, 'MATCH', value, 'COUNT', '1000']);
            setScanResult(result);
            setKeys(result[1]);
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await instanceApi.executeCommand(instanceId, 'scan', [scanResult[0], 'MATCH', searchValue, 'COUNT', '1000']);
            setScanResult(result);
            setKeys([
                ...keys,
                ...result[1]
            ]);
        }
    }

    if (!instanceId) {
        return (<Empty description="Please select an instance" />);
    }

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: key => <strong>{key}</strong>
        }
    ];

    const dataSource = keys.map(key => ({ key }));

    return (
        <React.Fragment>
            <Input.Search
                allowClear={true}
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
                <Col span={12}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: [selectedKey],
                            onChange: selectedRowKeys => setSelectedKey(selectedRowKeys[0]),
                        }} />
                </Col>
                <Col span={12}>
                    <KeyValue redisKey={selectedKey} />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ScanTool;