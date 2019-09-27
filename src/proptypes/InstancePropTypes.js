import PropTypes from 'prop-types';

export const InstancePropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    secret: PropTypes.string
});