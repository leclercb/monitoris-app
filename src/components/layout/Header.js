import React from 'react';
import { Button, Tooltip } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Logo from 'components/common/Logo';
import PromiseButton from 'components/common/PromiseButton';
import Spacer from 'components/common/Spacer';
import UserMenu from 'components/layout/UserMenu';
import { useAlertApi } from 'hooks/UseAlertApi';
import { useAppApi } from 'hooks/UseAppApi';
import { useInstanceApi } from 'hooks/UseInstanceApi';
import { usePrintApi } from 'hooks/UsePrintApi';

function Header() {
    const appApi = useAppApi();
    const alertApi = useAlertApi();
    const instanceApi = useInstanceApi();
    const printApi = usePrintApi();

    const onAddAlert = async () => {
        const alert = await alertApi.addAlert();
        await alertApi.setSelectedAlertId(alert.id);
    };

    const onRemoveAlert = async () => {
        await alertApi.deleteAlert(alertApi.selectedAlertId);
    };

    const onPrintAlerts = async () => {
        await printApi.printAlerts(alertApi.alerts);
    };

    const onAddInstance = async () => {
        const instance = await instanceApi.addInstance({ type: 'direct' });
        await instanceApi.setSelectedInstanceId(instance.id);
    };

    const onRemoveInstance = async () => {
        await instanceApi.deleteInstance(instanceApi.selectedInstanceId);
    };

    const onPrintInstances = async () => {
        await printApi.printInstances(instanceApi.instances);
    };

    const onSetSettingsVisible = async () => {
        await appApi.setSettingManagerOptions({ visible: true });
    };

    const onShowAlertsContent = async () => {
        await appApi.setSelectedView('alerts');
    };

    const onShowInstancesContent = async () => {
        await appApi.setSelectedView('instances');
    };

    const onShowExplorerContent = async () => {
        await appApi.setSelectedView('explorer');
    };

    const onShowToolsContent = async () => {
        await appApi.setSelectedView('tools');
    };

    const onShowGraphsContent = async () => {
        await appApi.setSelectedView('graphs');
    };

    const onShowDashboardsContent = async () => {
        await appApi.setSelectedView('dashboards');
    };

    const createButton = (icon, text, onClick, disabled = false) => {
        return (
            <React.Fragment>
                <Tooltip placement="bottom" title={text}>
                    <PromiseButton onClick={onClick} disabled={disabled}>
                        <Icon icon={icon} />
                    </PromiseButton>
                </Tooltip>
                <Spacer />
            </React.Fragment>
        );
    };

    return (
        <LeftRight right={(
            <React.Fragment>
                {appApi.pro ? (
                    <img src="resources/images/pro_badge.png" height={32} alt="Pro" style={{ marginRight: 10 }} />
                ) : null}
                {process.env.REACT_APP_MODE === 'electron' ? (<Logo size={40} />) : (<UserMenu />)}
            </React.Fragment>
        )}>
            <Button.Group style={{ marginRight: 50 }}>
                <PromiseButton
                    type={appApi.selectedView === 'alerts' ? 'dashed' : 'default'}
                    onClick={onShowAlertsContent}>
                    <Icon icon="bell" text="Alerts" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'instances' ? 'dashed' : 'default'}
                    onClick={onShowInstancesContent}>
                    <Icon icon="server" text="Instances" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'explorer' ? 'dashed' : 'default'}
                    onClick={onShowExplorerContent}>
                    <Icon icon="binoculars" text="Explorer" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'tools' ? 'dashed' : 'default'}
                    onClick={onShowToolsContent}>
                    <Icon icon="tools" text="Tools" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'graphs' ? 'dashed' : 'default'}
                    onClick={onShowGraphsContent}>
                    <Icon icon="chart-line" text="Graphs" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'dashboards' ? 'dashed' : 'default'}
                    onClick={onShowDashboardsContent}>
                    <Icon icon="chart-line" text="Dashboards" />
                </PromiseButton>
            </Button.Group>
            {appApi.selectedView === 'alerts' ?
                createButton('plus', 'Add Alert', onAddAlert)
                : null}
            {appApi.selectedView === 'alerts' ?
                createButton('trash-alt', 'Remove Alert', onRemoveAlert)
                : null}
            {appApi.selectedView === 'alerts' ?
                createButton('print', 'Print Alerts', onPrintAlerts)
                : null}
            {appApi.selectedView === 'instances' ?
                createButton('plus', 'Add Instance', onAddInstance)
                : null}
            {appApi.selectedView === 'instances' ?
                createButton('trash-alt', 'Remove Instance', onRemoveInstance)
                : null}
            {appApi.selectedView === 'instances' ?
                createButton('print', 'Print Instances', onPrintInstances)
                : null}
            <Spacer />
            <Spacer />
            {createButton('cog', 'Settings', onSetSettingsVisible)}
        </LeftRight>
    );
}

export default Header;