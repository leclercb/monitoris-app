import React, { useState } from 'react';
import { Menu } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import { useAppApi } from 'hooks/UseAppApi';

function DashboardSider() {
    const appApi = useAppApi();

    const [openKeys, setOpenKeys] = useState(['dashboards']);

    const onSelect = event => {
        appApi.setSelectedDashboardId(event.key);
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
            <Menu
                selectedKeys={[appApi.selectedDashboardId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="dashboards"
                    title={createCategorySubMenu('Dashboards', 'chart-line', () => onOpenChange('dashboards'))}>
                    <Menu.Item key="status">
                        <Icon icon="heartbeat" text="Status" />
                    </Menu.Item>
                    <Menu.Item key="connections">
                        <Icon icon="link" text="Connections" />
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default DashboardSider;