import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-webpack-loader-syntax
import exampleReadme from 'raw-loader!./example-content.html';
import ReadmeModal from './ReadmeModal';

export default {
    title: 'Modal/ReadmeModal',
    component: ReadmeModal,
    argTypes: {
        open: {
            control: {
                disable: true
            }
        }
    }
};

const Template = ({ content, className }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Readme" />
            <ReadmeModal className={className} content={content} open={open} onHide={() => setOpen(false)} />
        </div>
    );
};

Template.propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string
};

Template.defaultProps = {
    className: ''
};

export const Basic = Template.bind({});
Basic.args = {
    content: exampleReadme
};

export const LongContent = Template.bind({});
LongContent.args = {
    content: Array.from({ length: 3 })
        .map(
            () => `<h2>Header for a repeated section</h2>

                ${Array.from({ length: 5 })
                    .fill(
                        `
                    <p>
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                    </p>
                `
                    )
                    .join('\n')}`
        )
        .join('\n')
};
