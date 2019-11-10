import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import Icon from 'components/common/Icon';
import Panel from 'components/common/Panel';
import PromiseButton from 'components/common/PromiseButton';
import InstanceAlert from 'components/instances/alerts/InstanceAlert';
import AlertTable from 'components/toolbox/tools/history/AlertTable';
import { getConfig } from 'config/Config';
import withProCheck from 'containers/WithProCheck';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getDateTimeFormat } from 'utils/SettingUtils';

function AlertTool() {
    const instanceApi = useInstanceApi();
    const settingsApi = useSettingsApi();

    const instanceId = instanceApi.selectedInstanceId;

    const [range, setRange] = useState([moment().subtract(1, 'hour'), moment()]);
    const [alerts, setAlerts] = useState([]);
    const [selectedAlertIds, setSelectedAlertIds] = useState([]);

    const selectedAlert = selectedAlertIds.length === 1 ? alerts.find(alert => alert.id === selectedAlertIds[0]) : null;

    const refresh = async () => {
        if (instanceId && range && range[0] && range[1]) {
            const alerts = await instanceApi.getAlerts(
                instanceId,
                range[0].toISOString(),
                range[1].toISOString());

            setAlerts(alerts);
        }
    };

    useEffect(() => {
        refresh();
    }, [instanceId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Panel.Sub>
                <Panel.Standard>
                    <DatePicker.RangePicker
                        value={range}
                        onChange={setRange}
                        allowClear={false}
                        disabledDate={current => {
                            return current && (
                                current.isBefore(moment().subtract(getConfig().instanceAlertTtl, 'day')) ||
                                current.isAfter(moment()));
                        }}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                        }}
                        format={getDateTimeFormat(settingsApi.settings)} />
                    <PromiseButton onClick={refresh} style={{ marginLeft: 10 }}>
                        <Icon icon="sync-alt" text="Query" />
                    </PromiseButton>
                </Panel.Standard>
            </Panel.Sub>
            <Panel.Sub grow>
                <AlertTable
                    alerts={alerts}
                    selectedAlertIds={selectedAlertIds}
                    setSelectedAlertIds={setSelectedAlertIds}
                    orderSettingPrefix="instanceAlertColumnOrder_"
                    widthSettingPrefix="instanceAlertColumnWidth_" />
            </Panel.Sub>
            {selectedAlert && (
                <Panel.Sub grow>
                    <InstanceAlert instanceAlert={{
                        instance: instanceId,
                        ...selectedAlert
                    }} />
                </Panel.Sub>
            )}
        </React.Fragment >
    );
}

export default withProCheck(AlertTool);