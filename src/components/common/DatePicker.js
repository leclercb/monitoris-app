import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'components/common/DatePicker.css';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.defaultOpened === true
        };

        this.onChange = this.onChange.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.defaultOpened !== prevProps.defaultOpened) {
            this.setState({ open: this.props.defaultOpened });
        }
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value ? value.toISOString() : null);
        }
    }

    onOpenChange(status) {
        this.setState({ open: status });

        if (this.props.onOpenChange) {
            this.props.onOpenChange(status);
        }
    }

    setDate(value) {
        this.onChange(value);
        this.onOpenChange(false);
    }

    render() {
        let { value, ...wrappedProps } = this.props;

        if (value) {
            value = moment(value);
        }

        return (
            <AntDatePicker
                {...wrappedProps}
                value={value}
                onChange={this.onChange}
                open={this.state.open}
                onOpenChange={this.onOpenChange} />
        );
    }
}

DatePicker.propTypes = {
    defaultOpened: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onOpenChange: PropTypes.func
};

export default DatePicker;