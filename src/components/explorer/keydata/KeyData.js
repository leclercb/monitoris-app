import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Empty, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import HashValue from 'components/explorer/keydata/HashValue';
import ListValue from 'components/explorer/keydata/ListValue';
import SetValue from 'components/explorer/keydata/SetValue';
import StringValue from 'components/explorer/keydata/StringValue';
import RedisTypeTitle from 'components/redistype/RedisTypeTitle';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function KeyData(props) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [redisKey, setRedisKey] = useState(null);
    const [type, setType] = useState(null);
    const [length, setLength] = useState(0);

    useEffect(() => {
        const getData = async (redisKey) => {
            if (instanceId && redisKey) {
                const type = await instanceApi.executeCommand(instanceId, db, 'type', [redisKey]);
                setType(type);

                let length;

                switch (type) {
                    case 'string':
                        length = await instanceApi.executeCommand(instanceId, db, 'strlen', [redisKey]);
                        break;
                    case 'list':
                        length = await instanceApi.executeCommand(instanceId, db, 'llen', [redisKey]);
                        break;
                    case 'set':
                        length = await instanceApi.executeCommand(instanceId, db, 'scard', [redisKey]);
                        break;
                    case 'hash':
                        length = await instanceApi.executeCommand(instanceId, db, 'hlen', [redisKey]);
                        break;
                    default:
                        length = 0;
                        break;
                }

                setLength(length);
            }
        };

        setRedisKey(props.redisKey);
        setType(null);
        setLength(null);
        getData(props.redisKey);
    }, [props.redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const deleteKey = async () => {
        await instanceApi.executeCommand(instanceId, db, 'del', [redisKey]);

        if (props.onKeyDeleted) {
            props.onKeyDeleted(redisKey);
        }
    };

    if (!redisKey) {
        return (
            <div style={{ minHeight: '100%', padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    <Empty description="Please select a key" />
                </div>
            </div>
        );
    }

    let valueElement;

    switch (type) {
        case 'string': valueElement = (<StringValue redisKey={redisKey} length={length} />); break;
        case 'list': valueElement = (<ListValue redisKey={redisKey} length={length} />); break;
        case 'set': valueElement = (<SetValue redisKey={redisKey} length={length} />); break;
        case 'hash': valueElement = (<HashValue redisKey={redisKey} length={length} />); break;
        default: valueElement = null; break;
    }

    return (
        <React.Fragment>
            <div style={{ padding: 25 }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    <Descriptions size="small" column={1} bordered>
                        <Descriptions.Item label={(<strong>Key</strong>)}>{redisKey}</Descriptions.Item>
                        <Descriptions.Item label={(<strong>Type</strong>)}><RedisTypeTitle typeId={type} /></Descriptions.Item>
                        <Descriptions.Item label={(<strong>Length</strong>)}>{length}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Value</Divider>
                    {valueElement}
                </div>
            </div>
            <div style={{ padding: '0px 25px 25px 25px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 25 }}>
                    <Popconfirm
                        title={`Do you really want to delete the key "${redisKey}" ?`}
                        onConfirm={deleteKey}
                        okText="Yes"
                        cancelText="No">
                        <Button>
                            <Icon icon="trash-alt" text="Delete key" />
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </React.Fragment>
    );
}

KeyData.propTypes = {
    redisKey: PropTypes.string,
    onKeyDeleted: PropTypes.func
};

export default KeyData;