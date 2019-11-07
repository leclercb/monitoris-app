import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import EmptyInstance from 'components/common/empty/EmptyInstance';
import EmptyKey from 'components/common/empty/EmptyKey';
import HashValue from 'components/explorer/keydata/HashValue';
import ListValue from 'components/explorer/keydata/ListValue';
import SetValue from 'components/explorer/keydata/SetValue';
import StringValue from 'components/explorer/keydata/StringValue';
import RedisTypeTitle from 'components/redistype/RedisTypeTitle';
import { useInstanceApi } from 'hooks/UseInstanceApi';

function KeyData({ object, onKeyDeleted }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;

    const [redisKey, setRedisKey] = useState(null);
    const [type, setType] = useState(null);
    const [length, setLength] = useState(0);
    const [ttl, setTtl] = useState(0);

    const getData = async object => {
        const redisKey = object ? object.key : null;

        if (instanceId && redisKey) {
            let type = await instanceApi.executeCommand(instanceId, db, 'type', [redisKey]);
            let ttl = await instanceApi.executeCommand(instanceId, db, 'ttl', [redisKey]);
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
                case 'none':
                default:
                    length = 0;
                    type = object ? object.type : null;
                    break;
            }

            setType(type);
            setLength(length);
            setTtl(ttl);
        }
    };

    useEffect(() => {
        setRedisKey(object ? object.key : null);
        setType(null);
        setLength(0);
        getData(object);
    }, [object]); // eslint-disable-line react-hooks/exhaustive-deps

    const refreshData = async () => {
        await getData(object);
    };

    const deleteKey = async () => {
        await instanceApi.executeCommand(instanceId, db, 'del', [redisKey]);

        if (onKeyDeleted) {
            onKeyDeleted(redisKey);
        }
    };

    if (!instanceId) {
        return (
            <Panel.Sub>
                <EmptyInstance />
            </Panel.Sub>
        );
    }

    if (!redisKey) {
        return (
            <Panel.Sub>
                <EmptyKey />
            </Panel.Sub>
        );
    }

    let valueElement;

    switch (type) {
        case 'string': valueElement = (<StringValue redisKey={redisKey} refresh={refreshData} length={length} />); break;
        case 'list': valueElement = (<ListValue redisKey={redisKey} refresh={refreshData} />); break;
        case 'set': valueElement = (<SetValue redisKey={redisKey} refresh={refreshData} />); break;
        case 'hash': valueElement = (<HashValue redisKey={redisKey} refresh={refreshData} />); break;
        default: valueElement = null; break;
    }

    return (
        <React.Fragment>
            <Panel.Sub>
                <Descriptions size="small" column={1} bordered>
                    <Descriptions.Item label={(<strong>Key</strong>)}>{redisKey}</Descriptions.Item>
                    <Descriptions.Item label={(<strong>Type</strong>)}><RedisTypeTitle typeId={type} /></Descriptions.Item>
                    <Descriptions.Item label={(<strong>Length</strong>)}>{length}</Descriptions.Item>
                    <Descriptions.Item label={(<strong>TTL</strong>)}>{ttl === -1 ? 'None' : ttl}</Descriptions.Item>
                </Descriptions>
            </Panel.Sub>
            <Panel.Sub grow>
                {valueElement}
            </Panel.Sub>
            <Panel.Sub>
                <Panel.Standard>
                    <Popconfirm
                        title={`Do you really want to delete the key "${redisKey}" ?`}
                        onConfirm={deleteKey}
                        okText="Yes"
                        cancelText="No">
                        <Button>
                            <Icon icon="trash-alt" text="Delete key" />
                        </Button>
                    </Popconfirm>
                </Panel.Standard>
            </Panel.Sub>
        </React.Fragment>
    );
}

KeyData.propTypes = {
    object: PropTypes.object,
    onKeyDeleted: PropTypes.func
};

export default KeyData;