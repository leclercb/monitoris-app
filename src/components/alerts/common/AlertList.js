import React from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import { createActions } from 'utils/CategoryListUtils';

function AlertList(props) {
    return (
        <React.Fragment>
            <List
                size="small"
                bordered={true}
                dataSource={props.alerts}
                style={{ minHeight: 400, maxHeight: 400, overflowY: 'auto' }}
                renderItem={item => (
                    <List.Item
                        onClick={() => props.onAlertSelection(item)}
                        className={item.id === props.selectedAlertId ? 'selected-list-item' : null}>
                        <LeftRight right={createActions(item, () => props.duplicateAlert(item), () => props.deleteAlert(item.id))}>
                            <Icon icon="circle" color={item.color} text={item.title} />
                        </LeftRight>
                    </List.Item>
                )} />
            <Button onClick={() => props.addAlert()} style={{ marginTop: 5 }}>
                <Icon icon="plus" text="Add" />
            </Button>
        </React.Fragment>
    );
}

AlertList.propTypes = {
    alerts: PropTypes.array.isRequired,
    selectedAlertId: PropTypes.string,
    addAlert: PropTypes.func.isRequired,
    duplicateAlert: PropTypes.func.isRequired,
    deleteAlert: PropTypes.func.isRequired,
    onAlertSelection: PropTypes.func.isRequired
};

export default AlertList;