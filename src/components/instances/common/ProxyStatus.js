import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function ProxyStatus({ status }) {
    return (
        <React.Fragment>
            {status && status.proxyConnected && (
                <Alert
                    message="Proxy Connected"
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
            {status && !status.proxyConnected && (
                <Alert
                    message="Proxy Disconnected"
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
                    message="Proxy Missing Status"
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