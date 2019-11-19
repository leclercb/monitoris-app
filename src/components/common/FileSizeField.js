import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Select } from 'antd';
import { getFileSizeObject, getSizeFromFileSizeObject } from 'utils/FileUtils';

class FileSizeField extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
    }

    onChangeValue(value) {
        const fileSizeObject = getFileSizeObject(this.props.value);
        fileSizeObject.value = value;

        if (this.props.onChange) {
            this.props.onChange(getSizeFromFileSizeObject(fileSizeObject));
        }
    }

    onChangeUnit(value) {
        const fileSizeObject = getFileSizeObject(this.props.value);
        fileSizeObject.unit = value;

        if (this.props.onChange) {
            this.props.onChange(getSizeFromFileSizeObject(fileSizeObject));
        }
    }

    render() {
        let { value, ...wrappedProps } = this.props;

        const fileSizeObject = getFileSizeObject(value);

        return (
            <React.Fragment>
                <InputNumber
                    min={0}
                    value={Math.round(fileSizeObject.value * 1e2) / 1e2}
                    onBlur={event => this.onChangeValue(Number.parseFloat(event.target.value))} />
                <Select
                    {...wrappedProps}
                    value={fileSizeObject.unit}
                    onChange={this.onChangeUnit}
                    style={{ minWidth: 60, width: 60, marginLeft: 10 }}>
                    <Select.Option value="B">B</Select.Option>
                    <Select.Option value="kB">kB</Select.Option>
                    <Select.Option value="MB">MB</Select.Option>
                    <Select.Option value="GB">GB</Select.Option>
                    <Select.Option value="TB">TB</Select.Option>
                </Select>
            </React.Fragment>
        );
    }
}

FileSizeField.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
};

export default FileSizeField;