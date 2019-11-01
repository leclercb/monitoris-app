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
        const instance = await instanceApi.addInstance({
            type: 'proxy'
        });
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

    const onShowDashboardContent = async () => {
        await appApi.setSelectedView('dashboard');
    };

    const onShowExplorerContent = async () => {
        await appApi.setSelectedView('explorer');
    };

    const onShowToolboxContent = async () => {
        await appApi.setSelectedView('toolbox');
    };

    const onShowAlertContent = async () => {
        await appApi.setSelectedView('alert');
    };

    const onShowInstanceContent = async () => {
        await appApi.setSelectedView('instance');
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
                    type={appApi.selectedView === 'dashboard' ? 'dashed' : 'default'}
                    onClick={onShowDashboardContent}>
                    <Icon icon="chart-line" text="Dashboard" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'explorer' ? 'dashed' : 'default'}
                    onClick={onShowExplorerContent}>
                    <Icon icon="binoculars" text="Explorer" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'toolbox' ? 'dashed' : 'default'}
                    onClick={onShowToolboxContent}>
                    <Icon icon="tools" text="Toolbox" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'instance' ? 'dashed' : 'default'}
                    onClick={onShowInstanceContent}>
                    <Icon icon="server" text="Instances" />
                </PromiseButton>
                <PromiseButton
                    type={appApi.selectedView === 'alert' ? 'dashed' : 'default'}
                    onClick={onShowAlertContent}>
                    <Icon icon="bell" text="Alerts" />
                </PromiseButton>
            </Button.Group>
            {appApi.selectedView === 'alert' ?
                createButton('plus', 'Add Alert', onAddAlert)
                : null}
            {appApi.selectedView === 'alert' ?
                createButton('trash-alt', 'Remove Alert', onRemoveAlert)
                : null}
            {appApi.selectedView === 'alert' ?
                createButton('print', 'Print Alerts', onPrintAlerts)
                : null}
            {appApi.selectedView === 'instance' ?
                createButton('plus', 'Add Instance', onAddInstance)
                : null}
            {appApi.selectedView === 'instance' ?
                createButton('trash-alt', 'Remove Instance', onRemoveInstance)
                : null}
            {appApi.selectedView === 'instance' ?
                createButton('print', 'Print Instances', onPrintInstances)
                : null}
            <Spacer />
            <Spacer />
            {createButton('cog', 'Settings', onSetSettingsVisible)}
        </LeftRight>
    );
}

export default Header;