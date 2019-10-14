import React, { useEffect, useState } from 'react';
import { Descriptions, Empty } from 'antd';
import PropTypes from 'prop-types';
import ListValue from 'components/explorer/tools/keydata/ListValue';
import StringValue from 'components/explorer/tools/keydata/StringValue';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function KeyData(props) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const db = instanceApi.selectedExplorerDb;
    const [redisKey, setRedisKey] = useState(null);
    const [type, setType] = useState(null);
    const [length, setLength] = useState(null);

    useEffect(() => {
        const getData = async (redisKey) => {
            if (instanceId && redisKey) {
                const type = await instanceApi.executeCommand(instanceId, db, 'type', [redisKey]);
                setType(type);

                if (type === 'string') {
                    const length = await instanceApi.executeCommand(instanceId, db, 'strlen', [redisKey]);
                    setLength(length);
                }

                if (type === 'list') {
                    const length = await instanceApi.executeCommand(instanceId, db, 'llen', [redisKey]);
                    setLength(length);
                }

                if (type === 'hash') {
                    const length = await instanceApi.executeCommand(instanceId, db, 'hlen', [redisKey]);
                    setLength(length);
                }
            }
        };

        setRedisKey(props.redisKey);
        setType(null);
        setLength(null);
        getData(props.redisKey);
    }, [props.redisKey]);

    if (!redisKey) {
        return (<Empty description="Please select a key" />);
    }

    let valueElement;

    switch (type) {
        case 'string': valueElement = (<StringValue redisKey={redisKey} length={length} />); break;
        case 'list': valueElement = (<ListValue redisKey={redisKey} length={length} />); break;
        default: valueElement = null; break;
    }

    return (
        <React.Fragment>
            <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label={(<strong>Key</strong>)}>{redisKey}</Descriptions.Item>
                <Descriptions.Item label={(<strong>Type</strong>)}>{type}</Descriptions.Item>
                {length !== null ? (<Descriptions.Item label={(<strong>Length</strong>)}>{length}</Descriptions.Item>) : null}
                {valueElement && (<Descriptions.Item label={(<strong>Value</strong>)}>{valueElement}</Descriptions.Item>)}
            </Descriptions>
        </React.Fragment>
    );
}

KeyData.propTypes = {
    redisKey: PropTypes.string
};

export default KeyData;