import React from 'react';

import * as InternalComponents from '../components';
import StoryWithHooks from './StoryWithHooks';
import LiveEdit from './LiveEdit/LiveEdit';

// Code taken from @storybook/addon-docs Source.ts
const extract = (targetId, { source, locationsMap }) => {
    const location = locationsMap[targetId];
    // FIXME: bad locationsMap generated for module export functions whose titles are overridden
    if (!location) return null;
    const { startBody: start, endBody: end } = location;
    const lines = source.split('\n');
    if (start.line === end.line) {
        return lines[start.line - 1].substring(start.col, end.col);
    }
    // NOTE: storysource locations are 1-based not 0-based!
    const startLine = lines[start.line - 1];
    const endLine = lines[end.line - 1];
    return [
        startLine.substring(start.col),
        ...lines.slice(start.line, end.line - 1),
        endLine.substring(0, end.col)
    ].join('\n');
};

// FIXME: When https://github.com/storybookjs/storybook/issues/6642 is fixed, probably this decorator should be removed/refactored
export default function LiveEditDecorator(scope) {
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line react/display-name
        return (storyFn, context) => {
            const {
                id,
                parameters: { storySource }
            } = context;
            const source = extract(id, storySource);

            return <LiveEdit source={source} scope={{ ...InternalComponents, StoryWithHooks, ...scope }} />;
        };
    }
    return storyFn => storyFn();
}
