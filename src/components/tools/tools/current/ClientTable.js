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

function ClientTable({ clients, selectedClientIds, setSelectedClientIds, orderSettingPrefix, widthSettingPrefix }) {
    const settingsApi = useSettingsApi();

    const fields = [
        {
            static: true,
            id: 'id',
            title: 'ID',
            type: 'text',
            editable: false
        },
        {
            static: true,
            id: 'name',
            title: 'Name',
            type: 'text',
            editable: false
        },
        {
            static: true,
            id: 'addr',
            title: 'Address',
            type: 'text',
            editable: false
        },
        {
            static: true,
            id: 'fd',
            title: 'File Descriptor',
            type: 'text',
            editable: false
        },
        {
            static: true,
            id: 'age',
            title: 'Age',
            type: 'number',
            editable: false
        },
        {
            static: true,
            id: 'idle',
            title: 'Idle',
            type: 'number',
            editable: false
        },
        {
            static: true,
            id: 'flags',
            title: 'Flags',
            type: 'text',
            editable: false
        },
        {
            static: true,
            id: 'db',
            title: 'Db',
            type: 'number',
            editable: false
        },
        {
            static: true,
            id: 'cmd',
            title: 'Last Command',
            type: 'text',
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
                    rowCount={clients.length}
                    rowGetter={({ index }) => clients[index]}
                    rowStyle={({ index }) => {
                        const client = clients[index];

                        if (!client) {
                            return {};
                        }

                        let foregroundColor = 'initial';
                        let backgroundColor = getRowBackgroundColor(index, settingsApi.settings);

                        if (selectedClientIds.includes(client.id)) {
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
                        clients,
                        selectedClientIds,
                        setSelectedClientIds)}>
                    {columns}
                </Table>
            )}
        </AutoSizer>
    );
}

ClientTable.propTypes = {
    clients: PropTypes.array.isRequired,
    selectedClientIds: PropTypes.array.isRequired,
    setSelectedClientIds: PropTypes.func.isRequired,
    orderSettingPrefix: PropTypes.string.isRequired,
    widthSettingPrefix: PropTypes.string.isRequired
};

export default ClientTable;