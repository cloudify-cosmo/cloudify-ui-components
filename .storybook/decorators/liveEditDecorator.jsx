import React from 'react';
import LiveEdit from './LiveEdit/LiveEdit';

export default function(scope = {}) {
    // eslint-disable-next-line react/display-name
    return process.env.NODE_ENV !== 'test' ? [storyFn => <LiveEdit element={storyFn()} scope={scope} />] : [];
}
