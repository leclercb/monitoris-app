import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function RedisStatus({ status }) {
    return (
        <React.Fragment>
            {status && status.lastStatus === 'ready' && (
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
            {status && status.lastStatus && status.lastStatus !== 'ready' && (
                <Alert
                    message="Disconnected"
                    description={(
                        <div>
                            The Redis server is currently disconnected ({status.lastStatus}).
                            <br />
                            Refreshed on: {status.refreshDate}
                        </div>
                    )}
                    type="warning"
                    showIcon
                />
            )}
            {(!status || (status && !status.lastStatus)) && (
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