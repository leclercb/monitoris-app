import React, { useEffect, useState } from 'react';
import { Empty, Input, Table } from 'antd';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useInstanceStateApi } from 'hooks/UseInstanceStateApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { formatDate } from 'utils/SettingUtils';

function InfoTool() {
    const instanceApi = useInstanceApi();
    const instanceId = instanceApi.selectedInstanceId;
    const instanceStateApi = useInstanceStateApi(instanceId);
    const settingsApi = useSettingsApi();

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
        <React.Fragment>
            <Panel.Sub>
                <Panel.Standard>
                    <Input.Search
                        allowClear={true}
                        onChange={event => setSearchValue(event.target.value)}
                        onSearch={value => setSearchValue(value)}
                        style={{
                            width: 400,
                            marginRight: 10
                        }} />
                    <PromiseButton onClick={refresh}>
                        <Icon icon="sync-alt" text={`Refresh (${formatDate(instanceStateApi.lastInfo.timestamp, settingsApi.settings, true)})`} />
                    </PromiseButton>
                </Panel.Standard>
            </Panel.Sub>
            <Panel.Sub>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small" />
            </Panel.Sub>
        </React.Fragment>
    );
}

export default InfoTool;