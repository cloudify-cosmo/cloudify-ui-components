import PropTypes from 'prop-types';

export const visibilities = {
    PRIVATE: { name: 'private', icon: 'lock', color: 'red', title: 'Private resource' },
    TENANT: { name: 'tenant', icon: 'user', color: 'green', title: 'Tenant resource' },
    GLOBAL: { name: 'global', icon: 'globe', color: 'blue', title: 'Global resource' },
    UNKNOWN: { name: 'unknown', icon: 'question', color: 'grey', title: 'Unknown resource visibility' }
};

export const visibilityPropType = PropTypes.oneOf([
    visibilities.PRIVATE.name,
    visibilities.TENANT.name,
    visibilities.GLOBAL.name,
    visibilities.UNKNOWN.name
]);
