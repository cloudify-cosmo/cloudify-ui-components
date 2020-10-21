const _ = require('lodash');

module.exports = {
    stories: _.compact([process.env.NODE_ENV !== 'test' && '../src/**/*.stories.mdx', '../src/components/**/*.stories.jsx']),
    addons: ['@storybook/addon-docs/preset', '@storybook/preset-scss'],
};
