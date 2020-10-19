import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ErrorMessage from './ErrorMessage';

export default {
    title: 'Elements/ErrorMessage',
    component: ErrorMessage,
    decorators: [LiveEditDecorator({ ErrorMessage })]
};

export const basic = () => <ErrorMessage error="Invalid Blueprint ID provided" />;
basic.storyName = 'Default';

export const autoHide = () => <ErrorMessage autoHide error="This error will disappear soon." />;

export const customHeader = () => (
    <ErrorMessage header="Invalid input" error="Please provide value according to blueprint naming rules." />
);

export const errorsList = () => (
    <ErrorMessage
        header="Errors in the form"
        error={['Please provide deployment name', 'Please provide agent_private_key_path']}
    />
);

export const errorObject = () => (
    <ErrorMessage error={{ header: 'Input error', message: 'Please provide agent_private_key_path' }} />
);
