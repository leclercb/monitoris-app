import React from 'react';
import { Alert } from 'antd';

function DisabledStatus() {
    return (
        <Alert
            message="Instance Disabled"
            description={(
                <div>
                    The instance is currently disabled.
                </div>
            )}
            type="warning"
            showIcon />
    );
}

export default DisabledStatus;