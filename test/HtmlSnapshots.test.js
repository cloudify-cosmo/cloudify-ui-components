import initStoryshots from '@storybook/addon-storyshots';

let dateNowSpy;
beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2019, 9, 31).valueOf());
});

afterAll(() => {
    dateNowSpy.mockRestore();
});

initStoryshots();
