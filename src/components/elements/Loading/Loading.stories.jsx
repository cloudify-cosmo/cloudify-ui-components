import React from 'react';

import Loading from './Loading';

export default {
    title: 'Elements/Loading',
    component: Loading
};

export const basic = () => <Loading />;
basic.story = {
    name: 'Default'
};
export const customMessage = () => <Loading message="Loading files" />;
