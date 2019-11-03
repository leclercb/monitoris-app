import React from 'react';
import PropTypes from 'prop-types';

export function Main({ children }) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        padding: 25,
        spaceBetween: 25
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.node
};

export function Sub({ children, backgroundColor, grow }) {
    const style = {
        backgroundColor: backgroundColor || '#ffffff',
        borderRadius: 5,
        padding: 25,
        marginBottom: 25
    };

    if (grow) {
        style.flex = 1;
    }

    return (
        <div style={style}>
            {children}
        </div>
    );
}

Sub.propTypes = {
    children: PropTypes.node,
    backgroundColor: PropTypes.string,
    grow: PropTypes.bool
};

export default {
    Main,
    Sub
};