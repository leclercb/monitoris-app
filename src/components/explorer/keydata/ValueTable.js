import React from 'react';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import CellRenderer from 'components/common/table/CellRenderer';
import { ResizableAndMovableColumn, moveHandler, resizeHandler } from 'components/common/table/ResizableAndMovableColumn';
import { getWidthForType } from 'data/DataFieldTypes';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { getRowBackgroundColor } from 'utils/SettingUtils';

function ValueTable({ fields, items, updateItem, orderSettingPrefix, widthSettingPrefix }) {
    const settingsApi = useSettingsApi();

    let tableWidth = 0;

    const onResize = resizeHandler(widthSettingPrefix, settingsApi.updateSettings);
    const onMove = moveHandler(orderSettingPrefix, fields, settingsApi.settings, settingsApi.updateSettings);

    const columns = sortBy(fields, field => settingsApi.settings[orderSettingPrefix + field.id] || 0).map(field => {
        const settingKey = widthSettingPrefix + field.id;
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
                cellRenderer={({ cellData, rowData, rowIndex }) => (
                    <CellRenderer
                        record={rowData}
                        field={field}
                        value={cellData}
                        onChange={allValues => updateItem({
                            ...rowData,
                            ...allValues
                        }, rowIndex)} />
                )} />
        );
    });

    return (
        <Table
            width={tableWidth}
            height={150}
            rowHeight={32}
            headerHeight={20}
            rowCount={items.length}
            rowGetter={({ index }) => items[index]}
            rowStyle={({ index }) => {
                const item = items[index];

                if (!item) {
                    return {};
                }

                const foregroundColor = 'initial';
                const backgroundColor = getRowBackgroundColor(index, settingsApi.settings);

                return {
                    color: foregroundColor,
                    backgroundColor
                };
            }}>
            {columns}
        </Table>
    );
}

ValueTable.propTypes = {
    fields: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
    orderSettingPrefix: PropTypes.string.isRequired,
    widthSettingPrefix: PropTypes.string.isRequired
};

export default ValueTable;