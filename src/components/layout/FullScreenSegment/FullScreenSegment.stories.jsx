import React from 'react';
import { ThemeProvider } from 'styled-components';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import FullScreenSegment from './FullScreenSegment';

export default {
    title: 'Layout/FullScreenSegment',
    component: FullScreenSegment,
    decorators: [LiveEditDecorator({ FullScreenSegment, DivContainer, ThemeProvider })]
};

export const basic = () => (
    <DivContainer height={250}>
        <FullScreenSegment>Test</FullScreenSegment>
    </DivContainer>
);
basic.storyName = 'Default';

export const colored = () => (
    <DivContainer height={250}>
        <ThemeProvider theme={{ mainColor: 'green' }}>
            <FullScreenSegment>Test</FullScreenSegment>
        </ThemeProvider>
    </DivContainer>
);

export const styled = () => (
    <DivContainer height={250}>
        <FullScreenSegment style={{ borderRadius: 10, textAlign: 'center' }}>Test</FullScreenSegment>
    </DivContainer>
);
