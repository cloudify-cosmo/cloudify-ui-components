import React from 'react';
import PropTypes from 'prop-types';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import Dropdown from './Dropdown';

const DivContainer = ({ children }) => <div style={{ position: 'relative', height: 200 }}>{children}</div>;
DivContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export default {
    title: 'Elements/Dropdown',
    component: Dropdown,
    decorators: [LiveEditDecorator({ Dropdown, DivContainer })]
};

export const basic = StoryWithHooks(() => {
    const options = [{ text: 'Blue', value: 'blue' }, { text: 'Red', value: 'red' }, { text: 'White', value: 'white' }];
    const [value, setValue] = React.useState(options[0].value);

    return (
        <DivContainer>
            <Dropdown
                search
                selection
                options={options}
                value={value}
                onChange={(event, { value: v }) => setValue(v)}
            />
        </DivContainer>
    );
});
basic.story = {
    name: 'Default'
};

export const withEmptyOption = StoryWithHooks(() => {
    const options = [
        { text: 'Blue', value: 'blue' },
        { text: 'Red', value: 'red' },
        { text: 'White', value: 'white' },
        { text: '', value: '' }
    ];
    const [value, setValue] = React.useState(options[0].value);

    return (
        <DivContainer>
            <Dropdown
                search
                selection
                options={options}
                value={value}
                onChange={(event, { value: v }) => setValue(v)}
            />
        </DivContainer>
    );
});

export const empty = () => <Dropdown />;
