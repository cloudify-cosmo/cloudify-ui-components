import initStoryshots from '@storybook/addon-storyshots';

jest.mock('react-dom', () => ({
    createPortal: value => value,

    findDOMNode: () => ({ addEventListener: () => {} })
}));

initStoryshots();
