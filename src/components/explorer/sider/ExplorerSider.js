import React, { useState } from 'react';
import { Input, Menu, Tooltip } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import InstanceSelect from 'components/instances/common/InstanceSelect';

function ExplorerSider() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();

    const [openKeys, setOpenKeys] = useState(['tools']);

    const onSelect = event => {
        appApi.setSelectedExplorerToolId(event.key);
    };

    const onOpenChange = key => {
        const newOpenKeys = [...openKeys];

        if (newOpenKeys.includes(key)) {
            newOpenKeys.splice(newOpenKeys.indexOf(key), 1);
        } else {
            newOpenKeys.push(key);
        }

        setOpenKeys(newOpenKeys);
    };

    const createCategorySubMenu = (text, icon, onOpenChange) => {
        return (
            <LeftRight onClickLeft={onOpenChange}>
                <Icon icon={icon} text={text} />
            </LeftRight>
        );
    };

    const onSearch = value => {

    };

    return (
        <div
            className="joyride-task-sider"
            style={{ backgroundColor: '#ffffff', height: '100%' }}>
            <div style={{ width: '100%', padding: 10, textAlign: 'center' }}>
                <InstanceSelect
                    value={instanceApi.selectedExplorerInstanceId}
                    onChange={value => instanceApi.setSelectedExplorerInstanceId(value)}
                    placeholder="Select an instance..."
                    style={{ width: '100%' }} />
            </div>
            <div style={{ width: '100%', padding: 10, textAlign: 'center' }}>
                <Tooltip title="Press enter to search" placement="bottom">
                    <Input.Search
                        allowClear={true}
                        size="small"
                        placeholder="Search for ..."
                        style={{ width: '100%' }}
                        onSearch={value => onSearch(value)} />
                </Tooltip>
            </div>
            <Menu
                selectedKeys={[appApi.selectedExplorerToolId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="tools"
                    title={createCategorySubMenu('Tools', 'thumbtack', () => onOpenChange('tools'))}>
                    <Menu.Item key="info">
                        <Icon icon="info-circle" text="Get Info" />
                    </Menu.Item>
                    <Menu.Item key="scan">
                        <Icon icon="barcode" text="Scan" />
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default ExplorerSider;