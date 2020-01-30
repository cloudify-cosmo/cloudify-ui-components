import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import DivContainer from 'decorators/DivContainer';
import GenericField from './GenericField';
import Form from '../Form';

export default {
    title: 'Form/GenericField',
    component: GenericField,
    decorators: [LiveEditDecorator({ DivContainer, GenericField, Form })]
};

export const stringField = StoryWithHooks(() => {
    const [value, setValue] = React.useState('');

    return (
        <Form>
            <GenericField
                name="stringTest"
                required
                label="String"
                value={value}
                onChange={(event, { value: newValue }) => setValue(newValue)}
                type={GenericField.STRING_TYPE}
                icon="rocket"
                placeholder="Write text..."
            />
        </Form>
    );
});

export const passwordField = StoryWithHooks(() => {
    const [value, setValue] = React.useState('');

    return (
        <Form>
            <GenericField
                name="passwordTest"
                label="Password"
                value={value}
                onChange={(event, { value: newValue }) => setValue(newValue)}
                type={GenericField.PASSWORD_TYPE}
                icon="key"
            />
        </Form>
    );
});

export const numberField = StoryWithHooks(() => {
    const [value, setValue] = React.useState(5);

    return (
        <Form>
            <GenericField
                name="numberTest"
                label="Number"
                value={value}
                onChange={(event, { value: newValue }) => setValue(newValue)}
                type={GenericField.NUMBER_TYPE}
                min={1}
                max={10}
            />
        </Form>
    );
});

export const booleanField = StoryWithHooks(() => {
    const [value, setValue] = React.useState(true);

    return (
        <Form>
            <GenericField
                name="booleanTest"
                label="Boolean Test"
                value={value}
                onChange={(event, { checked: newValue }) => setValue(newValue)}
                type={GenericField.BOOLEAN_TYPE}
            />
        </Form>
    );
});

export const booleanListField = StoryWithHooks(() => {
    const [value, setValue] = React.useState('true');

    return (
        <Form>
            <GenericField
                name="booleanListTest"
                label="Boolean List"
                value={value}
                onChange={(event, { value: newValue }) => setValue(newValue)}
                type={GenericField.BOOLEAN_LIST_TYPE}
            />
        </Form>
    );
});

export const listField = StoryWithHooks(() => {
    const [value, setValue] = React.useState('b');

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="listTest"
                    label="List"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.LIST_TYPE}
                    items={['a', 'b', 'c']}
                />
            </Form>
        </DivContainer>
    );
});

export const numberListField = StoryWithHooks(() => {
    const [value, setValue] = React.useState(2);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="numberListTest"
                    label="Number List"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.NUMBER_LIST_TYPE}
                    items={[1, 2, 3]}
                />
            </Form>
        </DivContainer>
    );
});

export const multiSelectListField = StoryWithHooks(() => {
    const [value, setValue] = React.useState([2, 3, 4]);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="multiSelectListTest"
                    label="Multiselect List"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.MULTI_SELECT_LIST_TYPE}
                    items={[1, 2, 3, { value: 4, name: 'four' }, { value: 5, name: 'five' }]}
                />
            </Form>
        </DivContainer>
    );
});

export const editableListField = StoryWithHooks(() => {
    const [value, setValue] = React.useState('b');

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="editableListTest"
                    label="Editable List"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.EDITABLE_LIST_TYPE}
                    items={['a', 'b', 'c']}
                />
            </Form>
        </DivContainer>
    );
});

export const numberEditableListField = StoryWithHooks(() => {
    const [value, setValue] = React.useState(2);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="numberEditableListTest"
                    label="Number Editable List"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.NUMBER_EDITABLE_LIST_TYPE}
                    items={[1, 2, 3]}
                />
            </Form>
        </DivContainer>
    );
});

export const customField = StoryWithHooks(() => {
    const [value, setValue] = React.useState();

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="timeFilterTest"
                    label="Time Filter"
                    value={value}
                    onChange={(event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.CUSTOM_TYPE}
                    component={Form.Date}
                />
            </Form>
        </DivContainer>
    );
});

export const noCustomTypeField = () => (
    <GenericField name="timeFilterTest" label="No component prop specified" type={GenericField.CUSTOM_TYPE} />
);
