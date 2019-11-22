import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import reactElementToJSXString from 'react-element-to-jsx-string';
import './LiveEdit.css';

export default function LiveEdit({ element, scope = {} }) {
    const { type } = element;
    const name = type.displayName;
    const [open, setOpen] = React.useState(false);

    return (
        <LiveProvider code={reactElementToJSXString(element)} scope={{ [name]: type, ...scope }}>
            <LivePreview />

            {open ? (
                <Segment.Group>
                    <Button
                        onClick={() => setOpen(false)}
                        icon="code"
                        color="gray"
                        size="mini"
                        attached="top"
                        content="Close Editor"
                    />
                    <Segment inverted color="black">
                        <LiveEditor style={{ color: 'white', backgroundColor: 'black' }} />
                        <LiveError style={{ color: 'red', backgroundColor: 'black', padding: 10 }} />
                    </Segment>
                </Segment.Group>
            ) : (
                <Button
                    onClick={() => setOpen(true)}
                    icon="code"
                    basic
                    size="mini"
                    content="Edit Code"
                    floated="right"
                />
            )}
        </LiveProvider>
    );
};
LiveEdit.propTypes = {
    element: PropTypes.node.isRequired,
    scope: PropTypes.shape({})
};
LiveEdit.defaultProps = {
    scope: {}
};
