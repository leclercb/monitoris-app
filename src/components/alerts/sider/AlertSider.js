import React, { useState } from 'react';
import { Input, Menu, Tooltip } from 'antd';
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

    const onSearch = value => {

    };

    return (
        <div
            className="joyride-task-sider"
            style={{ backgroundColor: '#ffffff', height: '100%' }}>
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
                selectedKeys={[alertApi.selectedAlertId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="alerts"
                    title={createCategorySubMenu('Alerts', 'thumbtack', () => onOpenChange('alerts'))}>
                    {alertApi.alerts.map(alert => (
                        <Menu.Item key={alert.id} alert={alert}>
                            <ObjectMenuItem
                                object={alert}
                                onManage={null}
                                onEdit={null}
                                onDelete={() => alertApi.deleteAlert(alert.id)}
                                dropType="task"
                                onDrop={null} />
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default AlertSider;