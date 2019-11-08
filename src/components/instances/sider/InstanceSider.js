import React, { useState } from 'react';
import { Menu } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import ObjectMenuItem from 'components/sider/ObjectMenuItem';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function InstanceSider() {
    const instanceApi = useInstanceApi();

    const [openKeys, setOpenKeys] = useState(['instances']);

    const onSelect = event => {
        instanceApi.setSelectedInstanceId(event.item.props.instance.id);
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
                selectedKeys={[instanceApi.selectedInstanceId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="instances"
                    title={createCategorySubMenu('Instances', 'server', () => onOpenChange('instances'))}>
                    {instanceApi.instances.map(instance => (
                        <Menu.Item key={instance.id} instance={instance}>
                            <ObjectMenuItem
                                object={instance}
                                onDelete={() => instanceApi.deleteInstance(instance.id)} />
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default InstanceSider;