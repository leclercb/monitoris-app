import React, { useState } from 'react';
import { InputNumber, Menu, Tooltip } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import InstanceSelect from 'components/instances/common/InstanceSelect';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function GraphSider() {
    const appApi = useAppApi();
    const instanceApi = useInstanceApi();

    const [openKeys, setOpenKeys] = useState(['graphs', 'current', 'history']);

    const onSelect = event => {
        appApi.setSelectedGraphId(event.key);
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

    return (
        <div
            className="joyride-task-sider"
            style={{ backgroundColor: '#ffffff', height: '100%' }}>
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
            <Menu
                selectedKeys={[appApi.selectedGraphId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="graphs"
                    title={createCategorySubMenu('Graphs', 'chart-line', () => onOpenChange('graphs'))}>
                    <Menu.SubMenu
                        key="current"
                        title={createCategorySubMenu('Current', 'clock', () => onOpenChange('current'))}>
                        <Menu.Item key="current:commands">
                            <Icon icon="chart-bar" text="Commands" />
                        </Menu.Item>
                        <Menu.Item key="current:memory">
                            <Icon icon="chart-bar" text="Memory" />
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu
                        key="history"
                        title={createCategorySubMenu('History', 'history', () => onOpenChange('history'))}>
                        <Menu.Item key="history:commands">
                            <Icon icon="chart-line" text="Commands" />
                        </Menu.Item>
                        <Menu.Item key="history:connections">
                            <Icon icon="chart-line" text="Connections" />
                        </Menu.Item>
                        <Menu.Item key="history:memory">
                            <Icon icon="chart-line" text="Memory" />
                        </Menu.Item>
                        <Menu.Item key="history:operations">
                            <Icon icon="chart-line" text="Operations" />
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}

export default GraphSider;