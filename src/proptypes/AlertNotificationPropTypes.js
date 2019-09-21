import PropTypes from 'prop-types';

export const AlertNotificationTypePropType = PropTypes.oneOf(['email', 'sms', 'http']);

export const AlertNotificationPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: AlertNotificationTypePropType,
    severities: PropTypes.arrayOf(PropTypes.string.isRequired),
    destination: PropTypes.string
});