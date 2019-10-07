import React, { useEffect, useState } from 'react';
import { Empty, Input, Table } from 'antd';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { parseRedisString } from 'utils/FormatUtils';

function GetInfoTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [info, setInfo] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            if (instanceId) {
                const info = await instanceApi.getInfo(instanceId);
                setInfo(parseRedisString(info));
            }
        };

        getInfo();
    }, [instanceId]);

    if (!instanceId) {
        return (<Empty description="Please select an instance" />);
    }

    if (!info) {
        return (<Empty description="No data to display" />);
    }

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: key => <strong>{key}</strong>
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        }
    ];

    const dataSource = Object.keys(info).sort().filter(key => key.includes(searchValue)).map(key => ({
        key,
        value: info[key]
    }));

    return (
        <React.Fragment>
            <Input.Search
                allowClear={true}
                onSearch={value => setSearchValue(value)}
                style={{
                    width: 400,
                    marginBottom: 20
                }} />
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small" />
        </React.Fragment>
    );
}

export default GetInfoTool;