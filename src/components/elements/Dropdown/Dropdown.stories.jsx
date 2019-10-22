import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

export default {
    title: 'Elements/Dropdown',
    component: Dropdown,
    // eslint-disable-next-line react/display-name
    decorators: [storyFn => <div style={{ height: 200 }}>{storyFn()}</div>]
};

const defaultOptions = [
    { text: 'Blue', value: 'blue' },
    { text: 'Red', value: 'red' },
    { text: 'White', value: 'white' }
];

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function DropdownStoryWithHooks({ options }) {
    const [value, setValue] = useState(options[0].value);

    return (
        <Dropdown search selection options={options} value={value} onChange={(event, { value: v }) => setValue(v)} />
    );
}
DropdownStoryWithHooks.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, value: PropTypes.string })).isRequired
};

export const basic = () => <DropdownStoryWithHooks options={defaultOptions} />;
basic.story = {
    name: 'Default'
};
export const withEmptyOption = () => <DropdownStoryWithHooks options={[...defaultOptions, { text: '', value: '' }]} />;
export const empty = () => <Dropdown />;
