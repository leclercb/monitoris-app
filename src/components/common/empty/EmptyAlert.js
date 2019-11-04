import React from 'react';
import { Empty } from 'antd';
import PropTypes from 'prop-types';
import AlertSelect from 'components/alerts/common/AlertSelect';
import Icon from 'components/common/Icon';
import PromiseButton from 'components/common/PromiseButton';
import { useAppApi } from 'hooks/UseAppApi';
import { useAlertApi } from 'hooks/UseAlertApi';

function EmptyAlert({ hideSelect }) {
    const appApi = useAppApi();
    const alertApi = useAlertApi();

    if (alertApi.alerts.length === 0) {
        return (
            <Empty description={(
                <div>
                    <p>You don't have any alert yet</p>
                    <PromiseButton onClick={async () => {
                        const alert = await alertApi.addAlert();
                        await alertApi.setSelectedAlertId(alert.id);
                        await appApi.setSelectedView('alert');
                    }}>
                        <Icon icon="plus" text="Add your first alert" />
                    </PromiseButton>
                </div>
            )} />
        )
    }

    return (
        <Empty description={(
            <div>
                <p>Please select an alert</p>
                {!hideSelect && (
                    <AlertSelect
                        value={alertApi.selectedAlertId}
                        onChange={value => alertApi.setSelectedAlertId(value)}
                        placeholder="Select an alert..."
                        style={{ width: 300 }} />
                )}
            </div>
        )} />
    );
}

EmptyAlert.propTypes = {
    hideSelect: PropTypes.bool
}

export default EmptyAlert;