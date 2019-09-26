import React, { useEffect, useState } from 'react';
import { Empty, Tree } from 'antd';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { parseRedisString } from 'utils/FormatUtils';

function GetInfoTool() {
    const instanceApi = useInstanceApi();

    const instanceId = instanceApi.selectedExplorerInstanceId;
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            if (instanceId) {
                const info = await instanceApi.getInfo(instanceId);
                setInfo(parseRedisString(info));
            }
        };

        getInfo();
    }, [instanceId]);

    if (!info) {
        return (<Empty description="Please select an instance" />);
    }

    const createTreeNodes = object => {
        if (typeof object === 'object') {
            return Object.keys(object).map(key => {
                const value = object[key];

                if (typeof value === 'object') {
                    return (
                        <Tree.TreeNode key={key} title={key}>
                            {createTreeNodes(object[key])}
                        </Tree.TreeNode>
                    );
                }

                return (<Tree.TreeNode key={key} title={`${key} = ${value}`} />);
            })
        }

        return (<Tree.TreeNode title={object} />);
    };

    return (
        <Tree>
            {createTreeNodes(info)}
        </Tree>
    );
}

export default GetInfoTool;