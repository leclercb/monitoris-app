import React, { useState } from 'react';
import { Button, Empty, message } from 'antd';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import uuid from 'uuid/v4';
import Spacer from 'components/common/Spacer';
import CellRenderer from 'components/common/table/CellRenderer';
import { ResizableAndMovableColumn, moveHandler, resizeHandler } from 'components/common/table/ResizableAndMovableColumn';
import { multiSelectionHandler } from 'components/common/table/VirtualizedTable';
import Constants from 'constants/Constants';
import { getWidthForType, isAlwaysInEditionForType } from 'data/DataFieldTypes';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { AlertNotificationPropType } from 'proptypes/AlertNotificationPropTypes';
import { move } from 'utils/ArrayUtils';
import { getAlertNotificationBackgroundColor } from 'utils/SettingUtils';

function NotificationTable(props) {
    const settingsApi = useSettingsApi();
    const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);

    const onAddNotification = () => {
        props.updateNotifications([
            ...props.notifications,
            {
                id: uuid(),
                type: 'email'
            }
        ]);
    };

    const onUpdateNotification = notification => {
        const index = props.notifications.findIndex(item => item.id === notification.id);
        const notifications = [...props.notifications];
        notifications[index] = notification;
        props.updateNotifications(notifications);
    };

    const onDeleteNotifications = notificationIds => {
        const notifications = props.notifications.filter(notification => !notificationIds.includes(notification.id));
        props.updateNotifications(notifications);
    };

    const onTestNotifications = async notificationIds => {
        const notifications = props.notifications.filter(notification => notificationIds.includes(notification.id));

        for (let notification of notifications) {
            await props.testNotification(notification.type, notification.destination);
        }

        message.info('The sample notification has been successfully sent');
    };

    const onDropNotification = (dragData, dropData) => {
        const notifications = [...props.notifications];
        move(notifications, dragData.rowIndex, dropData.rowIndex);
        props.updateNotifications(notifications);
    };

    let tableWidth = 0;

    const onResize = resizeHandler(props.widthSettingPrefix, settingsApi.updateSettings);
    const onMove = moveHandler(props.orderSettingPrefix, props.notificationFields, settingsApi.settings, settingsApi.updateSettings);

    const columns = sortBy(props.notificationFields, field => settingsApi.settings[props.orderSettingPrefix + field.id] || 0).map(field => {
        const settingKey = props.widthSettingPrefix + field.id;
        let width = Number(settingsApi.settings[settingKey]);

        if (!width) {
            width = getWidthForType(field.type);
        }

        tableWidth += width + 10;

        return (
            <Column
                key={field.id}
                label={field.title}
                dataKey={field.id}
                width={width}
                flexGrow={0}
                flexShrink={0}
                headerRenderer={data => (
                    <ResizableAndMovableColumn
                        dataKey={data.dataKey}
                        label={data.label}
                        sortBy={data.sortBy}
                        sortDirection={data.sortDirection}
                        onResize={data => onResize(data, field.id, width + data.deltaX)}
                        onMove={(dragColumn, dropColumn) => onMove(dragColumn.dataKey, dropColumn.dataKey)} />
                )}
                cellRenderer={({ cellData, rowData, rowIndex }) => {
                    let dndProps = {};

                    if (!isAlwaysInEditionForType(field.type)) {
                        dndProps = {
                            dndEnabled: true,
                            dragType: 'notification',
                            dropType: 'notification',
                            dndData: {
                                object: rowData,
                                rowData,
                                rowIndex
                            },
                            onDrop: onDropNotification
                        };
                    }

                    return (
                        <CellRenderer
                            record={rowData}
                            field={field}
                            value={cellData}
                            onChange={allValues => onUpdateNotification({
                                ...rowData,
                                ...allValues
                            })}
                            {...dndProps} />
                    );
                }} />
        );
    });

    return (
        <React.Fragment>
            {props.notifications.length === 0 && (
                <Empty description={'No notification, click on the "Add" button to add your first notification !'} />
            )}
            {props.notifications.length > 0 && (
                <Table
                    width={tableWidth}
                    height={150}
                    rowHeight={32}
                    headerHeight={20}
                    rowCount={props.notifications.length}
                    rowGetter={({ index }) => props.notifications[index]}
                    rowStyle={({ index }) => {
                        const notification = props.notifications[index];

                        if (!notification) {
                            return {};
                        }

                        let foregroundColor = 'initial';
                        let backgroundColor = getAlertNotificationBackgroundColor(notification, index, settingsApi.settings);

                        if (selectedNotificationIds.includes(notification.id)) {
                            foregroundColor = Constants.selectionForegroundColor;
                            backgroundColor = Constants.selectionBackgroundColor;
                        }

                        return {
                            color: foregroundColor,
                            backgroundColor
                        };
                    }}
                    onRowClick={multiSelectionHandler(
                        rowData => rowData.id,
                        props.notifications,
                        selectedNotificationIds,
                        setSelectedNotificationIds)} >
                    {columns}
                </Table>
            )}
            <div style={{ marginTop: 10 }}>
                <Button
                    onClick={() => onAddNotification()}>
                    Add
                </Button>
                <Spacer />
                <Button
                    onClick={() => onDeleteNotifications(selectedNotificationIds)}
                    disabled={selectedNotificationIds.length === 0}>
                    Delete
                </Button>
                <Spacer />
                <Button
                    onClick={() => onTestNotifications(selectedNotificationIds)}
                    disabled={selectedNotificationIds.length !== 1}>
                    Send sample notification
                </Button>
            </div>
        </React.Fragment>
    );
}

NotificationTable.propTypes = {
    notifications: PropTypes.arrayOf(AlertNotificationPropType.isRequired).isRequired,
    notificationFields: PropTypes.arrayOf(FieldPropType.isRequired).isRequired,
    updateNotifications: PropTypes.func.isRequired,
    testNotification: PropTypes.func.isRequired,
    orderSettingPrefix: PropTypes.string.isRequired,
    widthSettingPrefix: PropTypes.string.isRequired
};

export default NotificationTable;