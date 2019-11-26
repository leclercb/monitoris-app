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

export function Sub({ children, backgroundColor, grow, flexDirection }) {
    const style = {
        display: 'flex',
        flexDirection: flexDirection || 'column',
        backgroundColor: backgroundColor || '#ffffff',
        borderRadius: 5,
        padding: 15,
        marginTop: 15,
        maxWidth: '100%',
        overflow: 'auto'
    };

    if (grow) {
        style.minHeight = 100;
        style.flex = '1 1 auto';
        style.height = 0;
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
    grow: PropTypes.bool,
    flexDirection: PropTypes.string
};

export function Grow({ children }) {
    const style = {
        minHeight: 100,
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