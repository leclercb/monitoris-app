import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, Table } from 'antd';
import Panel from 'components/common/Panel';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';

function InfoTool() {
    const instanceApi = useInstanceApi();
    const instanceId = instanceApi.selectedInstanceId;
    const instanceStateApi = useInstanceStateApi(instanceId);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            if (instanceId && !instanceStateApi.lastInfo) {
                await instanceApi.getInfo(instanceId);
            }
        };

        getInfo();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!instanceStateApi.lastInfo) {
        return (
            <Panel.Sub>
                <Empty description="No data to display" />
            </Panel.Sub>
        );
    }

    const refresh = async () => {
        await instanceApi.getInfo(instanceId);
    };

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: key => <strong>{key}</strong> // eslint-disable-line react/display-name
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        }
    ];

    const dataSource = Object.keys(instanceStateApi.lastInfo).sort().filter(key => key.includes(searchValue)).map(key => ({
        key,
        value: instanceStateApi.lastInfo[key]
    }));

    return (
        <Panel.Sub>
            <Input.Search
                allowClear={true}
                onSearch={value => setSearchValue(value)}
                style={{
                    width: 400,
                    marginBottom: 20
                }} />
            <Button
                onClick={refresh}
                style={{ marginLeft: 10 }}>
                Refresh
            </Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small" />
        </Panel.Sub>
    );
}

export default InfoTool;