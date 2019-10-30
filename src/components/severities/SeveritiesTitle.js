import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useSeverityApi } from 'hooks/UseSeverityApi';

export function SeveritiesTitle(props) {
    const severityApi = useSeverityApi();
    const severities = severityApi.severities.filter(severity => (props.severityIds || []).includes(severity.id));

    return severities.map(severity => (
        <Icon
            key={severity.id}
            icon={severity.icon}
            color={severity.color}
            text={severity.title}
            globalStyle={{ marginRight: 10 }} />
    ));
}

SeveritiesTitle.propTypes = {
    severityIds: PropTypes.array
};

export default SeveritiesTitle;