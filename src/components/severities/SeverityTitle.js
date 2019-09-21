import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useSeverity } from 'hooks/UseSeverity';

export function SeverityTitle(props) {
    const severity = useSeverity(props.severityId);
    return severity ? <Icon icon="circle" color={severity.color} text={severity.title} /> : <span>&nbsp;</span>;
}

SeverityTitle.propTypes = {
    severityId: PropTypes.string
};

export default SeverityTitle;