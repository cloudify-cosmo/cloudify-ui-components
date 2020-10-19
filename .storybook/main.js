const stories = ['../src/components/**/*.stories.jsx'];
if (process.env.NODE_ENV !== 'test') {
    stories.push('../src/**/*.stories.mdx')
}

module.exports = {
    stories,
    addons: ['@storybook/addon-docs/preset', '@storybook/preset-scss'],
};
