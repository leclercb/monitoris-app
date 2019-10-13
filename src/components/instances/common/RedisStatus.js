import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function RedisStatus({ status }) {
    return (
        <React.Fragment>
            {status && status.redisConnected && (
                <Alert
                    message="Connected"
                    description={(
                        <div>
                            The Redis server is currently connected.
                            <br />
                            Refreshed on: {status.refreshDate}
                        </div>
                    )}
                    type="success"
                    showIcon
                />
            )}
            {status && !status.redisConnected && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The Redis server is currently disconnected.
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
                    description="The Redis server status has not been retrieved."
                    type="info"
                    showIcon
                />
            )}
        </React.Fragment>
    );
}

RedisStatus.propTypes = {
    status: PropTypes.object
};

export default RedisStatus;