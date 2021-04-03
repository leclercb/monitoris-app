import React, { useState } from 'react';
import { Empty } from 'antd';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import { v4 as uuid } from 'uuid';
import PromiseButton from 'components/common/PromiseButton';
import Spacer from 'components/common/Spacer';
import CellRenderer from 'components/common/table/CellRenderer';
import { ResizableAndMovableColumn, moveHandler, resizeHandler } from 'components/common/table/ResizableAndMovableColumn';
import { multiSelectionHandler } from 'components/common/table/VirtualizedTable';
import Constants from 'constants/Constants';
import { getWidthForType, isAlwaysInEditionForType } from 'data/DataFieldTypes';
import { useSettingsApi } from 'hooks/UseSettingsApi';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { InfoItemPropType } from 'proptypes/InfoItemPropType';
import { move } from 'utils/ArrayUtils';
import { getRowBackgroundColor } from 'utils/SettingUtils';

function InfoItemTable(props) {
    const settingsApi = useSettingsApi();
    const [selectedInfoItemIds, setSelectedInfoItemIds] = useState([]);

    const onAddInfoItem = async () => {
        await props.updateInfoItems([
            ...props.infoItems,
            {
                id: uuid(),
                field: '',
                value: ''
            }
        ]);
    };

    const onUpdateInfoItem = async infoItem => {
        const index = props.infoItems.findIndex(item => item.id === infoItem.id);
        const infoItems = [...props.infoItems];
        infoItems[index] = infoItem;
        await props.updateInfoItems(infoItems);
    };

    const onDeleteInfoItem = async infoItemIds => {
        const infoItems = props.infoItems.filter(item => !infoItemIds.includes(item.id));
        await props.updateInfoItems(infoItems);
    };

    const onDropInfoItem = async (dragData, dropData) => {
        const infoItems = [...props.infoItems];
        move(infoItems, dragData.rowIndex, dropData.rowIndex);
        await props.updateInfoItems(infoItems);
    };

    let tableWidth = 0;

    const onResize = resizeHandler(props.widthSettingPrefix, settingsApi.updateSettings);
    const onMove = moveHandler(props.orderSettingPrefix, props.infoItemFields, settingsApi.settings, settingsApi.updateSettings);

    const columns = sortBy(props.infoItemFields, field => settingsApi.settings[props.orderSettingPrefix + field.id] || 0).map(field => {
        const settingKey = props.widthSettingPrefix + field.id;
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
                cellRenderer={({ cellData, rowData, rowIndex }) => {
                    let dndProps = {};

                    if (!isAlwaysInEditionForType(field.type)) {
                        dndProps = {
                            dndEnabled: true,
                            dragType: 'infoItem',
                            dropType: 'infoItem',
                            dndData: {
                                object: rowData,
                                rowData,
                                rowIndex
                            },
                            onDrop: onDropInfoItem
                        };
                    }

                    return (
                        <CellRenderer
                            record={rowData}
                            field={field}
                            value={cellData}
                            onChange={allValues => onUpdateInfoItem({
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
            {props.infoItems.length === 0 && (
                <Empty description={'No info item, click on the "Add" button to add your first info item !'} />
            )}
            {props.infoItems.length > 0 && (
                <Table
                    width={tableWidth}
                    height={150}
                    rowHeight={32}
                    headerHeight={20}
                    rowCount={props.infoItems.length}
                    rowGetter={({ index }) => props.infoItems[index]}
                    rowStyle={({ index }) => {
                        const infoItem = props.infoItems[index];

                        if (!infoItem) {
                            return {};
                        }

                        let foregroundColor = 'initial';
                        let backgroundColor = getRowBackgroundColor(index, settingsApi.settings);

                        if (selectedInfoItemIds.includes(infoItem.id)) {
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
                        props.infoItems,
                        selectedInfoItemIds,
                        setSelectedInfoItemIds)}>
                    {columns}
                </Table>
            )}
            <div style={{ marginTop: 10 }}>
                <PromiseButton
                    onClick={() => onAddInfoItem()}>
                    Add
                </PromiseButton>
                <Spacer />
                <PromiseButton
                    onClick={() => onDeleteInfoItem(selectedInfoItemIds)}
                    disabled={selectedInfoItemIds.length === 0}>
                    Delete
                </PromiseButton>
            </div>
        </React.Fragment>
    );
}

InfoItemTable.propTypes = {
    infoItems: PropTypes.arrayOf(InfoItemPropType.isRequired).isRequired,
    infoItemFields: PropTypes.arrayOf(FieldPropType.isRequired).isRequired,
    updateInfoItems: PropTypes.func.isRequired,
    orderSettingPrefix: PropTypes.string.isRequired,
    widthSettingPrefix: PropTypes.string.isRequired
};

export default InfoItemTable;