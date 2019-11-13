import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import InstanceAlert from 'components/instances/alerts/InstanceAlert';

export function ModalInstanceAlert({ instanceAlert, visible, onClose }) {
    if (!instanceAlert) {
        return null;
    }

    return (
        <Modal
            title={<Icon icon="bell" text="Alert Details" />}
            visible={visible}
            width="80%"
            closable={false}
            onOk={onClose}
            onCancel={onClose}
            footer={(
                <Button onClick={onClose}>
                    Close
                </Button>
            )}>
            <InstanceAlert instanceAlert={instanceAlert} />
        </Modal>
    );
}

ModalInstanceAlert.propTypes = {
    instanceAlert: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalInstanceAlert;