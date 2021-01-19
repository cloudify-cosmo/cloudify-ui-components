import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ReadmeModal from './ReadmeModal';

export default {
    title: 'Modal/ReadmeModal',
    component: ReadmeModal,
    decorators: [],
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
    content: `<h1>HTML Ipsum Presents</h1>

<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

<h2>Header Level 2</h2>

<ol>
    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
    <li>Aliquam tincidunt mauris eu risus.</li>
</ol>

<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

<h3>Header Level 3</h3>

<ul>
    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
    <li>Aliquam tincidunt mauris eu risus.</li>
</ul>

<pre><code>
#header h1 a {
    display: block;
    width: 300px;
    height: 80px;
}
</code></pre>`
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
