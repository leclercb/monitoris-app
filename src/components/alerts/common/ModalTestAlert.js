import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import ModalAlertConditionResult from 'components/alerts/alertconditionresult/ModalAlertConditionResult';
import InfoItemTable from 'components/alerts/common/InfoItemTable';
import Icon from 'components/common/Icon';
import PromiseButton from 'components/common/PromiseButton';
import Spacer from 'components/common/Spacer';
import { getInfoItemFields } from 'data/DataInfoItemFields';
import { getRedisFields } from 'data/DataRedisFields';
import { useAlertApi } from 'hooks/UseAlertApi';
import { AlertPropType } from 'proptypes/AlertPropTypes';
import { getFields } from 'utils/FilterUtils';

function ModalTestAlert({ alert, visible, onClose }) {
    const alertApi = useAlertApi();
    const [infoItems, setInfoItems] = useState([]);
    const [alertConditionResult, setAlertConditionResult] = useState(null);

    useEffect(() => {
        const fields = getFields(alert.condition, getRedisFields());
        setInfoItems(fields.map(field => ({
            id: uuid(),
            field,
            value: ''
        })));
    }, [alert]);

    const onOk = async () => {
        try {
            const result = await alertApi.testAlert(alert.id, infoItems);
            console.log(result);
            setAlertConditionResult(result);
        } catch (error) {
            // Skip
        }
    };

    return (
        <Modal
            title={<Icon icon="question-circle" text="Test Alert Conditions" />}
            visible={visible}
            width={800}
            closable={false}
            footer={(
                <React.Fragment>
                    <Button onClick={() => onClose()}>
                        Close
                    </Button>
                    <Spacer />
                    <PromiseButton type="primary" onClick={onOk}>
                        Test
                    </PromiseButton>
                </React.Fragment>
            )}>
            <InfoItemTable
                infoItems={infoItems}
                infoItemFields={getInfoItemFields()}
                updateInfoItems={setInfoItems}
                orderSettingPrefix="infoItemColumnOrder_"
                widthSettingPrefix="infoItemColumnWidth_" />
            <ModalAlertConditionResult
                alertConditionResult={alertConditionResult}
                visible={!!alertConditionResult}
                onClose={() => setAlertConditionResult(null)} />
        </Modal>
    );
}

ModalTestAlert.propTypes = {
    alert: AlertPropType.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalTestAlert;