import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useSeverityApi } from 'hooks/UseSeverityApi';

export const SeveritySelect = React.forwardRef(function SeveritySelect(props, ref) {
    const severityApi = useSeverityApi();
    const value = severityApi.writableSeverities.find(severity => severity.id === props.value) ? props.value : undefined;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {severityApi.writableSeverities.map(severity => (
                <Select.Option key={severity.id} value={severity.id}>
                    <Icon icon={severity.icon} color={severity.color} text={severity.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

SeveritySelect.displayName = 'ForwardRefSeveritySelect';

SeveritySelect.propTypes = {
    value: PropTypes.string
};

export default SeveritySelect;