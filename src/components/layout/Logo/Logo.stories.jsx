import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Logo from './Logo';

export default {
    title: 'Layout/Logo',
    component: Logo,
    decorators: [LiveEditDecorator({ Logo, DivContainer })]
};

export const basic = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo />
    </DivContainer>
);
basic.storyName = 'Default';

export const customUrl = () => (
    <DivContainer height={250}>
        <Logo url="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg" />
    </DivContainer>
);

export const customStyle = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo style={{ height: '100%', width: '100%', backgroundPositionX: 'center' }} />
    </DivContainer>
);
