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
        marginBottom: 25,
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

export function Flex({ children }) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

Flex.propTypes = {
    children: PropTypes.node
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
    Flex,
    Grow,
    Standard
};