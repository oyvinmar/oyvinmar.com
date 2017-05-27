import PropTypes from 'prop-types';

export const EventShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  serviceUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date),
});
