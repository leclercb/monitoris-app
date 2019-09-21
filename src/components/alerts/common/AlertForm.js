import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'antd';
import FilterConditionTree from 'components/filters/FilterConditionTree';
import FilterForm from 'components/filters/FilterForm';
import { AlertPropType } from 'proptypes/AlertPropTypes';

function AlertForm(props) {
    return (
        <React.Fragment>
            <FilterForm
                filter={props.alert}
                updateFilter={props.updateAlert} />
            <Divider>Filters</Divider>
            <FilterConditionTree
                filter={props.alert}
                context={{
                    fields: []
                }}
                updateFilter={props.updateAlert} />
        </React.Fragment>
    );
}

AlertForm.propTypes = {
    form: PropTypes.object.isRequired,
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired
};

export default Form.create({ name: 'alert' })(AlertForm);