import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import FullScreenSegment from './FullScreenSegment';

export default {
    title: 'Layout/FullScreenSegment',
    component: FullScreenSegment,
    decorators: [LiveEditDecorator({ FullScreenSegment, DivContainer })]
};

export const basic = () => (
    <DivContainer height={250}>
        <FullScreenSegment>Test</FullScreenSegment>
    </DivContainer>
);
basic.storyName = 'Default';

export const colored = () => (
    <DivContainer height={250}>
        <FullScreenSegment backgroundColor="green">Test</FullScreenSegment>
    </DivContainer>
);

export const styled = () => (
    <DivContainer height={250}>
        <FullScreenSegment style={{ borderRadius: 10, textAlign: 'center' }}>Test</FullScreenSegment>
    </DivContainer>
);
