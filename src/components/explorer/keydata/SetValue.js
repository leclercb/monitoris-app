import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Panel from 'components/common/Panel';
import Spacer from 'components/common/Spacer';
import ModalFieldForm from 'components/explorer/common/ModalFieldForm';
import ValueTable from 'components/explorer/keydata/ValueTable';
import { useInstanceApi } from 'hooks/UseInstanceApi';

const BATCH_SIZE = 100;

function SetValue({ redisKey, refresh }) {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedInstanceId;
    const db = instanceApi.selectedDb;
    const [items, setItems] = useState([]);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [searchValue, setSearchValue] = useState('*');
    const [modalFieldFormVisible, setModalFieldFormVisible] = useState(false);

    const executeScan = async (value, scanResult) => {
        const parameters = [redisKey, scanResult ? scanResult[0] : 0, 'MATCH', value, 'COUNT', BATCH_SIZE];
        const result = await instanceApi.executeCommand(instanceId, db, 'sscan', parameters);
        return result;
    };

    const scan = async value => {
        setSearchValue(value);

        if (instanceId) {
            const result = await executeScan(value, null);
            setScanResult(result);
            setItems(result[1].map(item => ({
                id: item,
                value: item
            })));
        }
    };

    const continueScanning = async () => {
        if (instanceId && scanResult) {
            const result = await executeScan(searchValue, scanResult);
            setScanResult(result);
            setItems([
                ...items,
                ...result[1].map(item => ({
                    id: item,
                    value: item
                }))
            ]);
        }
    };

    const addItem = async item => {
        await instanceApi.executeCommand(instanceId, db, 'sadd', [redisKey, item.value]);
        await refresh();
        await scan(searchValue);
        setModalFieldFormVisible(false);
    };

    const updateItem = async item => {
        await instanceApi.executeCommand(instanceId, db, 'srem', [redisKey, item.id]);
        await instanceApi.executeCommand(instanceId, db, 'sadd', [redisKey, item.value]);
        await refresh();
        await scan(searchValue);
    };

    const deleteItems = async () => {
        const promises = selectedItemIds.map(id => instanceApi.executeCommand(instanceId, db, 'srem', [redisKey, id]));
        await Promise.all(promises);
        await refresh();
        await scan(searchValue);
    };

    useEffect(() => {
        setItems([]);
        setScanResult(null);
        scan(searchValue);
    }, [redisKey]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!redisKey) {
        return null;
    }

    const fields = [
        {
            static: true,
            id: 'value',
            title: 'Value',
            type: 'text',
            editable: true
        }
    ];

    return (
        <Panel.Flex>
            <ModalFieldForm
                fields={fields}
                title={(<Icon icon="key" text="Add Member" />)}
                visible={modalFieldFormVisible}
                onOk={addItem}
                onCancel={() => setModalFieldFormVisible(false)} />
            <Panel.Grow>
                <ValueTable
                    fields={fields}
                    items={items}
                    updateItem={updateItem}
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    orderSettingPrefix="setValueColumnOrder_"
                    widthSettingPrefix="setValueColumnWidth_" />
            </Panel.Grow>
            <Panel.Standard>
                <div style={{ marginTop: 10 }}>
                    <Button
                        onClick={() => setModalFieldFormVisible(true)}>
                        <Icon icon="plus" text="Add Item" />
                    </Button>
                    <Spacer />
                    <Popconfirm
                        title={'Do you really want to delete the selected members ?'}
                        onConfirm={deleteItems}
                        okText="Yes"
                        cancelText="No">
                        <Button>
                            <Icon icon="trash-alt" text="Remove Selected Member(s)" />
                        </Button>
                    </Popconfirm>
                </div>
            </Panel.Standard>
            <Panel.Standard>
                <div style={{ marginTop: 10 }}>
                    <LeftRight right={(
                        <Button
                            onClick={continueScanning}
                            disabled={!scanResult || scanResult[0] === '0'}
                            style={{ marginLeft: 10 }}>
                            Continue Scanning
                    </Button>
                    )}>
                        <Input.Search
                            placeholder="Pattern"
                            allowClear={true}
                            defaultValue={searchValue}
                            onSearch={value => scan(value)} />
                    </LeftRight>
                </div>
            </Panel.Standard>
        </Panel.Flex>
    );
}

SetValue.propTypes = {
    redisKey: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
};

export default SetValue;