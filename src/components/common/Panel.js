import React from 'react';
import PropTypes from 'prop-types';
import Monitor from 'components/monitor/Monitor';

export function Main({ children, showMonitor }) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        spaceBetween: 15
    };

    return (
        <div style={style}>
            {showMonitor && (
                <Monitor />
            )}
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.node,
    showMonitor: PropTypes.bool
};

export function Sub({ children, backgroundColor, grow }) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor || '#ffffff',
        borderRadius: 5,
        padding: 15,
        marginTop: 15,
        maxWidth: '100%',
        overflow: 'auto'
    };

    if (grow) {
        style.minHeight = 200;
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

export function Grow({ children }) {
    const style = {
        minHeight: 200,
        maxWidth: '100%',
        overflow: 'auto',
        flex: 1
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

Grow.propTypes = {
    children: PropTypes.node
};

export function Standard({ children }) {
    const style = {
        maxWidth: '100%',
        overflow: 'auto'
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

Standard.propTypes = {
    children: PropTypes.node
};

export default {
    Main,
    Sub,
    Grow,
    Standard
};