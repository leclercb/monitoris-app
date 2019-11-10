import React from 'react';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';
import CellRenderer from 'components/common/table/CellRenderer';
import { ResizableAndMovableColumn, moveHandler, resizeHandler } from 'components/common/table/ResizableAndMovableColumn';
import { multiSelectionHandler } from 'components/common/table/VirtualizedTable';
import Constants from 'constants/Constants';
import { getWidthForType } from 'data/DataFieldTypes';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getRowBackgroundColor } from 'utils/SettingUtils';

function AlertTable({ alerts, selectedAlertIds, setSelectedAlertIds, orderSettingPrefix, widthSettingPrefix }) {
    const settingsApi = useSettingsApi();

    const fields = [
        {
            static: true,
            id: 'id',
            title: 'Date',
            type: 'dateTime',
            editable: false
        },
        {
            static: true,
            id: 'alert',
            title: 'Alert',
            type: 'alert',
            editable: false
        },
        {
            static: true,
            id: 'currSeverity',
            title: 'Severity',
            type: 'severity',
            editable: false
        },
        {
            static: true,
            id: 'prevSeverity',
            title: 'Previous Severity',
            type: 'severity',
            editable: false
        }
    ];

    let tableWidth = 0;

    const onResize = resizeHandler(widthSettingPrefix, settingsApi.updateSettings);
    const onMove = moveHandler(orderSettingPrefix, fields, settingsApi.settings, settingsApi.updateSettings);

    const columns = sortBy(fields, field => settingsApi.settings[orderSettingPrefix + field.id] || 0).map(field => {
        const settingKey = widthSettingPrefix + field.id;
        let width = Number(settingsApi.settings[settingKey]);

        if (!width || width < 10) {
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
                cellRenderer={({ cellData, rowData }) => (
                    <CellRenderer
                        record={rowData}
                        field={field}
                        value={cellData}
                        onChange={() => null} />
                )} />
        );
    });

    return (
        <AutoSizer>
            {({ height }) => (
                <Table
                    width={tableWidth}
                    height={height}
                    rowHeight={32}
                    headerHeight={20}
                    rowCount={alerts.length}
                    rowGetter={({ index }) => alerts[index]}
                    rowStyle={({ index }) => {
                        const alert = alerts[index];

                        if (!alert) {
                            return {};
                        }

                        let foregroundColor = 'initial';
                        let backgroundColor = getRowBackgroundColor(index, settingsApi.settings);

                        if (selectedAlertIds.includes(alert.id)) {
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
                        alerts,
                        selectedAlertIds,
                        setSelectedAlertIds)}>
                    {columns}
                </Table>
            )}
        </AutoSizer>
    );
}

AlertTable.propTypes = {
    alerts: PropTypes.array.isRequired,
    selectedAlertIds: PropTypes.array.isRequired,
    setSelectedAlertIds: PropTypes.func.isRequired,
    orderSettingPrefix: PropTypes.string.isRequired,
    widthSettingPrefix: PropTypes.string.isRequired
};

export default AlertTable;