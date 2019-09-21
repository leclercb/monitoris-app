import React from 'react';
import PropTypes from 'prop-types';

function Logo({ size, style }) {
    return (
        <img
            alt="Logo"
            src={`resources/images/logo.png`}
            style={{
                ...style,
                width: size,
                height: size
            }} />
    );
}

Logo.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object
};

export default Logo;