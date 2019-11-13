import React from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import { createActions } from 'utils/CategoryListUtils';

function InstanceList(props) {
    return (
        <React.Fragment>
            <List
                size="small"
                bordered={true}
                dataSource={props.instances}
                style={{ minHeight: 400, maxHeight: 400, overflowY: 'auto' }}
                renderItem={item => (
                    <List.Item
                        onClick={() => props.onInstanceSelection(item)}
                        className={item.id === props.selectedInstanceId ? 'selected-list-item' : null}>
                        <LeftRight right={createActions(item, () => props.duplicateInstance(item), () => props.deleteInstance(item.id))}>
                            <Icon icon="circle" color={item.color} text={item.title} />
                        </LeftRight>
                    </List.Item>
                )} />
            <Button onClick={() => props.addInstance()} style={{ marginTop: 5 }}>
                <Icon icon="plus" text="Add" />
            </Button>
        </React.Fragment>
    );
}

InstanceList.propTypes = {
    instances: PropTypes.array.isRequired,
    selectedInstanceId: PropTypes.string,
    addInstance: PropTypes.func.isRequired,
    duplicateInstance: PropTypes.func.isRequired,
    deleteInstance: PropTypes.func.isRequired,
    onInstanceSelection: PropTypes.func.isRequired
};

export default InstanceList;