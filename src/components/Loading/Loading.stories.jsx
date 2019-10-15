import React from 'react';

import Loading from './Loading';

export default {
    title: 'Loading',
    component: Loading
};

export const basic = () => <Loading />;
basic.story = {
    name: 'Default'
};
export const custom = () => <Loading message="Loading files" />;
custom.story = {
    name: 'Custom message'
};
