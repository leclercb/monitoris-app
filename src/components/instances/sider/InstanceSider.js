import React, { useState } from 'react';
import { Input, Menu, Tooltip } from 'antd';
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
                selectedKeys={[instanceApi.selectedInstanceId]}
                openKeys={openKeys}
                onSelect={onSelect}
                mode="inline">
                <Menu.SubMenu
                    key="instances"
                    title={createCategorySubMenu('Instances', 'thumbtack', () => onOpenChange('instances'))}>
                    {instanceApi.instances.map(instance => (
                        <Menu.Item key={instance.id} instance={instance}>
                            <ObjectMenuItem
                                object={instance}
                                onManage={null}
                                onEdit={null}
                                onDelete={() => instanceApi.deleteInstance(instance.id)}
                                dropType="task"
                                onDrop={null} />
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu >
        </div>
    );
}

export default InstanceSider;