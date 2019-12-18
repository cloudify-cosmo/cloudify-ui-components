import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import './LiveEdit.css';

export default function LiveEdit({ source, scope }) {
    const [open, setOpen] = React.useState(false);
    const [reset, setReset] = React.useState(false);
    const key = String(reset);

    return (
        <LiveProvider key={key} code={source} scope={scope}>
            <LivePreview />

            <div style={{ marginTop: 20, textAlign: 'left' }}>
                {open ? (
                    <>
                        <Segment.Group>
                            <Segment inverted color="black" textAlign="right" compact basic>
                                <Button
                                    onClick={() => setReset(!reset)}
                                    compact
                                    icon="refresh"
                                    color="black"
                                    size="mini"
                                    content="Reset"
                                />
                                <Button
                                    onClick={() => setOpen(false)}
                                    compact
                                    icon="remove"
                                    color="black"
                                    size="mini"
                                    content="Close"
                                />
                            </Segment>
                            <Segment inverted color="black">
                                <LiveEditor style={{ color: 'white', backgroundColor: 'black' }} />
                                <LiveError style={{ color: 'white', backgroundColor: 'indianred', padding: 10 }} />
                            </Segment>
                        </Segment.Group>
                    </>
                ) : (
                    <Button
                        onClick={() => setOpen(true)}
                        icon="code"
                        floated="right"
                        basic
                        compact
                        size="mini"
                        content="Edit Code"
                    />
                )}
            </div>
        </LiveProvider>
    );
}
LiveEdit.propTypes = {
    source: PropTypes.string.isRequired,
    scope: PropTypes.shape({})
};
LiveEdit.defaultProps = {
    scope: {}
};
