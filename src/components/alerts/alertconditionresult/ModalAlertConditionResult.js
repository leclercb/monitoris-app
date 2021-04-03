import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import AlertConditionResult from 'components/alerts/alertconditionresult/AlertConditionResult';
import Icon from 'components/common/Icon';

export function ModalAlertConditionResult({ alertConditionResult, visible, onClose }) {
    if (!alertConditionResult) {
        return null;
    }

    return (
        <Modal
            title={<Icon icon="bell" text="Alert Condition Result" />}
            visible={visible}
            width={1000}
            closable={false}
            onOk={onClose}
            onCancel={onClose}
            footer={(
                <Button onClick={onClose}>
                    Close
                </Button>
            )}>
            <AlertConditionResult alertConditionResult={alertConditionResult} />
        </Modal>
    );
}

ModalAlertConditionResult.propTypes = {
    alertConditionResult: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalAlertConditionResult;