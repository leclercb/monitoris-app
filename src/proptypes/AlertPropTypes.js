import PropTypes from 'prop-types';
import { AlertNotificationPropType } from 'proptypes/AlertNotificationPropTypes';

export const AlertPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    instances: PropTypes.arrayOf(PropTypes.string.isRequired),
    condition: PropTypes.object,
    notifications: PropTypes.arrayOf(AlertNotificationPropType.isRequired)
});