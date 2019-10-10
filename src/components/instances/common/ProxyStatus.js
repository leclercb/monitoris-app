import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function ProxyStatus({ status }) {
    return (
        <React.Fragment>
            {status && status.connected && (
                <Alert
                    message="Connected"
                    description={(
                        <div>
                            The proxy is currently connected.
                            <br />
                            Refreshed on: {status.refreshDate}
                        </div>
                    )}
                    type="success"
                    showIcon
                />
            )}
            {status && !status.connected && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The proxy is currently disconnected.
                            <br />
                            Refreshed on: {status.refreshDate}
                        </div>
                    )}
                    type="warning"
                    showIcon
                />
            )}
            {!status && (
                <Alert
                    message="Missing Status"
                    description="The proxy status has not been retrieved."
                    type="info"
                    showIcon
                />
            )}
        </React.Fragment>
    );
}

ProxyStatus.propTypes = {
    status: PropTypes.object
};

export default ProxyStatus;