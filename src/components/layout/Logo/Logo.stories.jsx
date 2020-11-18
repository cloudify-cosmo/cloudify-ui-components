import React from 'react';
import { ThemeProvider } from 'styled-components';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Logo from './Logo';

export default {
    title: 'Layout/Logo',
    component: Logo,
    decorators: [LiveEditDecorator({ Logo, DivContainer, ThemeProvider })]
};

export const basic = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo />
    </DivContainer>
);
basic.storyName = 'Default';

export const logoFromTheme = () => (
    <ThemeProvider
        theme={{
            logoUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png'
        }}
    >
        <DivContainer height={60}>
            <Logo />
        </DivContainer>
    </ThemeProvider>
);

export const logoFromUrl = () => (
    <DivContainer height={60}>
        <Logo url="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg" />
    </DivContainer>
);

export const customStyle = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo style={{ height: '100%', width: '100%', backgroundPositionX: 'center' }} />
    </DivContainer>
);
