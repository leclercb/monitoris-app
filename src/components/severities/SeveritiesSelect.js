import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useSeverityApi } from 'hooks/UseSeverityApi';

export const SeveritiesSelect = React.forwardRef(function SeveritiesSelect(props, ref) {
    const severityApi = useSeverityApi();
    const value = (props.value || []).filter(severityId => !!severityApi.writableSeverities.find(severity => severity.id === severityId));

    return (
        <Select ref={ref} allowClear={true} {...props} mode="multiple" value={value}>
            {severityApi.severities.map(severity => (
                <Select.Option key={severity.id} value={severity.id}>
                    <Icon icon="circle" color={severity.color} text={severity.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

SeveritiesSelect.displayName = 'ForwardRefSeveritiesSelect';

SeveritiesSelect.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default SeveritiesSelect;