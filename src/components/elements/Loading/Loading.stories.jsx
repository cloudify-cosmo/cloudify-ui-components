import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Loading from './Loading';

export default {
    title: 'Elements/Loading',
    component: Loading,
    decorators: [LiveEditDecorator({ Loading })]
};

export const basic = () => <Loading />;
basic.story = {
    name: 'Default'
};

export const customMessage = () => <Loading message="Loading files" />;
