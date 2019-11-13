import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import 'jquery.terminal';
import 'components/common/Terminal.css';

function Terminal({ terminalRef, interpreter, ...options }) {
    const divRef = useRef();

    useEffect(() => {
        if (divRef.current) {
            const terminal = $(divRef.current).terminal(interpreter, options);
            terminalRef.current = terminal;

            return () => {
                terminalRef.current = null;
                terminal.destroy();
            };
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={divRef} style={{ minHeight: '100%', maxHeight: '100%' }} />
    );
}

Terminal.propTypes = {
    terminalRef: PropTypes.object.isRequired,
    interpreter: PropTypes.func.isRequired
};

export default Terminal;