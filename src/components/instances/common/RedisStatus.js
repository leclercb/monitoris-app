import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { formatDate } from 'utils/SettingUtils';

function RedisStatus({ status }) {
    const settingsApi = useSettingsApi();

    return (
        <React.Fragment>
            {status && status.redisConnected && (
                <Alert
                    message="Redis Connected"
                    description={(
                        <div>
                            The Redis server is currently connected.
                            <br />
                            Refreshed on: {formatDate(status.refreshDate, settingsApi.settings, true)}
                            <br />
                            Last execution on: {status.lastExecutionDate ? formatDate(status.lastExecutionDate, settingsApi.settings, true) : 'never'}
                            <br />
                            <span style={{ fontSize: 11, fontStyle: 'italic' }}>It can take up to 1 minute to get the updated connection status.</span>
                        </div>
                    )}
                    type="success"
                    showIcon />
            )}
            {status && !status.redisConnected && (
                <Alert
                    message="Redis Disconnected"
                    description={(
                        <div>
                            The Redis server is currently disconnected.
                            <br />
                            Refreshed on: {formatDate(status.refreshDate, settingsApi.settings, true)}
                            <br />
                            Last execution on: {status.lastExecutionDate ? formatDate(status.lastExecutionDate, settingsApi.settings, true) : 'never'}
                            <br />
                            Disconnection count: {status.disconnectionCount}
                            <br />
                            <span style={{ fontSize: 11, fontStyle: 'italic' }}>It can take up to 1 minute to get the updated connection status.</span>
                        </div>
                    )}
                    type="warning"
                    showIcon />
            )}
            {!status && (
                <Alert
                    message="Redis Missing Status"
                    description="The Redis server status has not been retrieved."
                    type="info"
                    showIcon />
            )}
        </React.Fragment>
    );
}

RedisStatus.propTypes = {
    status: PropTypes.object
};

export default RedisStatus;