import React from 'react';
import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Constants from 'constants/Constants';

function ObjectMenuItem({ object, onDelete }) {
    const createDeleteButton = (object, onDelete) => {
        return (
            <Popconfirm
                title={`Do you really want to delete "${object.title}" ?`}
                onConfirm={() => onDelete()}
                okText="Yes"
                cancelText="No">
                <Icon
                    icon="trash-alt"
                    color={Constants.fadeIconColor}
                    className="object-actions" />
            </Popconfirm>
        );
    };

    return (
        <LeftRight right={createDeleteButton(object, onDelete)}>
            <Icon icon="circle" color={object.color} text={object.title} />
        </LeftRight>
    );
}

ObjectMenuItem.propTypes = {
    object: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ObjectMenuItem;