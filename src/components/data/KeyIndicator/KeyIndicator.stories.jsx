import React from 'react';

import KeyIndicator from './KeyIndicator';

export default {
    title: 'Data/KeyIndicator',
    component: KeyIndicator,
    // eslint-disable-next-line react/display-name
    decorators: [storyFn => <div style={{ height: 150 }}>{storyFn()}</div>]
};
export const userStars = () => <KeyIndicator title="User Stars" icon="star" number={54} />;
export const executions = () => <KeyIndicator title="Running Executions" icon="cogs" number={6} />;
export const plugins = () => <KeyIndicator title="Plugins" icon="plug" number={3} />;
