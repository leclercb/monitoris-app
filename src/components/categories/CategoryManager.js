import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import SeverityManager from 'components/severities/SeverityManager';

function CategoryManager(props) {
    const { category, objectId } = props;

    const onActiveKeyChange = activeKey => {
        props.onCategorySelection(activeKey);
    };

    const onObjectSelection = objectId => {
        props.onObjectSelection(objectId);
    };

    return (
        <Tabs
            activeKey={category}
            onChange={onActiveKeyChange}
            animated={false}
            className="joyride-category-manager-tabs">
            <Tabs.TabPane tab="Severities" key="severities">
                <SeverityManager severityId={category === 'severities' ? objectId : null} onSeveritySelection={onObjectSelection} />
            </Tabs.TabPane>
        </Tabs>
    );
}

CategoryManager.propTypes = {
    category: PropTypes.string.isRequired,
    objectId: PropTypes.string,
    onCategorySelection: PropTypes.func.isRequired,
    onObjectSelection: PropTypes.func.isRequired
};

export default CategoryManager;