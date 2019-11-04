import React from 'react';
import { Empty } from 'antd';

function EmptyInstance() {
    return (
        <Empty description={(
            <div>
                <p>Please select a key</p>
            </div>
        )} />
    );
}

export default EmptyInstance;