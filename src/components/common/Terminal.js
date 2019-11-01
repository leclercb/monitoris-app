import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import 'jquery.terminal';
import 'components/common/Terminal.css';

function Terminal({ interpreter, ...options }) {
    const terminalRef = useRef();

    useEffect(() => {
        const terminal = $(terminalRef.current).terminal(interpreter, options);
        return () => terminal.destroy();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={terminalRef} style={{ minHeight: '100%', maxHeight: '100%' }} />
    );
}

Terminal.propTypes = {
    interpreter: PropTypes.func.isRequired
};

export default Terminal;