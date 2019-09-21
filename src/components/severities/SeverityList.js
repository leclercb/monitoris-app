import React from 'react';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import { createActions } from 'utils/CategoryListUtils';

function SeverityList(props) {
    return (
        <React.Fragment>
            <List
                size="small"
                bordered={true}
                dataSource={props.severities}
                style={{ minHeight: 400, maxHeight: 400, overflowY: 'auto' }}
                renderItem={item => (
                    <List.Item
                        onClick={() => props.onSeveritySelection(item)}
                        className={item.id === props.selectedSeverityId ? 'selected-list-item' : null}>
                        <LeftRight right={createActions(item, () => props.duplicateSeverity(item), () => props.deleteSeverity(item.id))}>
                            <Icon icon="circle" color={item.color} text={item.title} />
                        </LeftRight>
                    </List.Item>
                )}
            />
            <Button onClick={() => props.addSeverity()} style={{ marginTop: 5 }}>
                <Icon icon="plus" text="Add" />
            </Button>
        </React.Fragment>
    );
}

SeverityList.propTypes = {
    severities: PropTypes.array.isRequired,
    selectedSeverityId: PropTypes.string,
    addSeverity: PropTypes.func.isRequired,
    duplicateSeverity: PropTypes.func.isRequired,
    deleteSeverity: PropTypes.func.isRequired,
    onSeveritySelection: PropTypes.func.isRequired
};

export default SeverityList;