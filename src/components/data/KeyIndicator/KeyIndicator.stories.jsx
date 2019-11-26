import React from 'react';
import { Button } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import KeyIndicator from './KeyIndicator';

export default {
    title: 'Data/KeyIndicator',
    component: KeyIndicator,
    decorators: [LiveEditDecorator({ Button, KeyIndicator, DivContainer })]
};

export const userStars = () => (
    <DivContainer>
        <KeyIndicator title="User Stars" icon="star" number={54} />
    </DivContainer>
);

export const executions = () => (
    <DivContainer>
        <KeyIndicator title="Running Executions" icon="cogs" number={6} />
    </DivContainer>
);

export const plugins = () => (
    <DivContainer>
        <KeyIndicator title="Plugins" icon="plug" number={3} />
    </DivContainer>
);
