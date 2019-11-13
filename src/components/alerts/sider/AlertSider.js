import React, { useState } from 'react';
import { Menu } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import ObjectMenuItem from 'components/sider/ObjectMenuItem';
import { useAlertApi } from 'hooks/UseAlertApi';

function AlertSider() {
    const alertApi = useAlertApi();

    const [openKeys, setOpenKeys] = useState(['alerts']);

    const onSelect = event => {
        alertApi.setSelectedAlertId(event.item.props.alert.id);
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
                selectedKeys={[alertApi.selectedAlertId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="alerts"
                    title={createCategorySubMenu('Alerts', 'bell', () => onOpenChange('alerts'))}>
                    {alertApi.alerts.map(alert => (
                        <Menu.Item key={alert.id} alert={alert}>
                            <ObjectMenuItem
                                object={alert}
                                onDelete={() => alertApi.deleteAlert(alert.id)} />
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default AlertSider;