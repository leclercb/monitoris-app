import PropTypes from 'prop-types';

export const InfoItemPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    field: PropTypes.string,
    value: PropTypes.string
});