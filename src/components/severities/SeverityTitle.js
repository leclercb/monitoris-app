import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useSeverityApi } from 'hooks/UseSeverityApi';

export function SeverityTitle(props) {
    const severityApi = useSeverityApi();

    const severity = severityApi.severities.find(severity => severity.id === props.severityId);

    return severity ? <Icon icon="circle" color={severity.color} text={severity.title} /> : <span>&nbsp;</span>;
}

SeverityTitle.propTypes = {
    severityId: PropTypes.string
};

export default SeverityTitle;