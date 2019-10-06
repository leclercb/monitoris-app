import React, { useEffect, useState } from 'react';
import { Descriptions, Empty } from 'antd';
import PropTypes from 'prop-types';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function KeyValue({ redisKey }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [type, setType] = useState(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
        const getType = async () => {
            if (instanceId && redisKey) {
                const type = await instanceApi.executeCommand(instanceId, 'type', [redisKey]);
                setType(type);

                if (type === 'string') {
                    const value = await instanceApi.executeCommand(instanceId, 'get', [redisKey]);
                    console.log(value);
                    setValue(value);
                }
            }
        };

        getType();
    }, [redisKey]);

    if (!redisKey) {
        return (<Empty description="Please select a key" />);
    }

    return (
        <React.Fragment>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Key">{redisKey}</Descriptions.Item>
                <Descriptions.Item label="Type">{type}</Descriptions.Item>
                <Descriptions.Item label="Value">{value}</Descriptions.Item>
            </Descriptions>
        </React.Fragment>
    );
}

KeyValue.propTypes = {
    redisKey: PropTypes.string
}

export default KeyValue;