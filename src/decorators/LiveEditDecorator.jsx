import React from 'react';

import * as InternalComponents from '../components';
import LiveEdit from './LiveEdit/LiveEdit';

// FIXME: When https://github.com/storybookjs/storybook/issues/6642 is fixed, probably this decorator should be removed/refactored
export default function LiveEditDecorator(scope) {
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line react/display-name
        return (storyFn, context) => {
            const {
                parameters: {
                    storySource: { source }
                }
            } = context;

            return <LiveEdit source={source} scope={{ ...InternalComponents, ...scope }} />;
        };
    }
    return storyFn => storyFn();
}
