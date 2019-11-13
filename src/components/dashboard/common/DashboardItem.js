import React from 'react';
import PropTypes from 'prop-types';

function DashboardItem({ children }) {
    const style = {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        border: '1px solid #cccccc',
        padding: 10,
        margin: 25
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

DashboardItem.propTypes = {
    children: PropTypes.node
};

export default DashboardItem;