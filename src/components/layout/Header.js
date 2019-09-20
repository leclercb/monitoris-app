import React from 'react';
import { Button, Tooltip } from 'antd';
import Icon from 'components/common/Icon';
import LeftRight from 'components/common/LeftRight';
import Logo from 'components/common/Logo';
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
        alertApi.setSelectedAlertId(alert.id);
    };

    const onRemoveAlert = () => {
        alertApi.deleteAlert(alertApi.selectedAlertId);
    };

    const onPrintAlerts = () => {
        printApi.printAlerts(alertApi.notes);
    };

    const onAddInstance = async () => {
        const instance = await instanceApi.addInstance();
        instanceApi.setSelectedInstanceId(instance.id);
    };

    const onRemoveInstance = () => {
        instanceApi.deleteInstance(instanceApi.selectedInstanceId);
    };

    const onPrintInstances = () => {
        printApi.printInstances(instanceApi.notes);
    };

    const onSetCategoryManagerVisible = () => {
        appApi.setCategoryManagerOptions({ visible: true });
    };

    const onSetSettingsVisible = () => {
        appApi.setSettingManagerOptions({ visible: true });
    };

    const onShowExplorerContent = () => {
        appApi.setSelectedView('explorer');
    };

    const onShowAlertContent = () => {
        appApi.setSelectedView('alert');
    };

    const onShowInstanceContent = () => {
        appApi.setSelectedView('instance');
    };

    const createButton = (icon, text, onClick, disabled = false) => {
        return (
            <React.Fragment>
                <Tooltip placement="bottom" title={text}>
                    <Button onClick={onClick} disabled={disabled}>
                        <Icon icon={icon} />
                    </Button>
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
                <Button
                    type={appApi.selectedView === 'explorer' ? 'dashed' : 'default'}
                    onClick={onShowExplorerContent}>
                    <Icon icon="tasks" text="Explorer" />
                </Button>
                <Button
                    type={appApi.selectedView === 'alert' ? 'dashed' : 'default'}
                    onClick={onShowAlertContent}>
                    <Icon icon="calendar-alt" text="Alerts" />
                </Button>
                <Button
                    type={appApi.selectedView === 'instance' ? 'dashed' : 'default'}
                    onClick={onShowInstanceContent}>
                    <Icon icon="book" text="Instances" />
                </Button>
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
            {createButton('cubes', 'Category Manager', onSetCategoryManagerVisible)}
        </LeftRight>
    );
}

export default Header;