import React, { useState } from 'react';
import Dropdown from './Dropdown';

export default {
    title: 'Elements/Dropdown',
    component: Dropdown,
    // eslint-disable-next-line react/display-name
    decorators: [storyFn => <div style={{ height: 200 }}>{storyFn()}</div>]
};

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
function DropdownStoryWithHooks() {
    const options = [
        { text: 'Option 1', value: 'option1' },
        { text: 'Option 2', value: 'option2' },
        { text: 'Option 3', value: 'option3' }
    ];
    const [value, setValue] = useState(options[0].value);

    return (
        <Dropdown search selection options={options} value={value} onChange={(event, { value: v }) => setValue(v)} />
    );
}
export const basic = () => <DropdownStoryWithHooks />;
basic.story = {
    name: 'Default'
};
