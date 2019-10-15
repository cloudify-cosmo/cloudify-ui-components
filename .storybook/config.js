import { addParameters, configure } from '@storybook/react';
import theme from './theme';

addParameters({
    options: {
        theme
    },
});

let loaders = [];
if (process.env.NODE_ENV !== 'test') {
    loaders.push(require.context('../src', true, /\.stories\.mdx$/))
}
loaders.push(require.context('../src', true, /\.stories\.jsx$/));

configure(
    loaders,
    module
);
