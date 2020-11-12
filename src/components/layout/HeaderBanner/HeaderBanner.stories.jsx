import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderBanner from './HeaderBanner';

export default {
    title: 'Layout/HeaderBanner',
    component: HeaderBanner,
    decorators: [LiveEditDecorator({ HeaderBanner, DivContainer })]
};

export const basic = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner productName="My Product" productVersion="2.3.5" licenseEdition="Premium" />
    </DivContainer>
);
basic.storyName = 'Default';

export const customLogo = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner
            logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg"
            productName="My Product"
            productVersion="2.3.5"
        />
    </DivContainer>
);

export const noVersionDetails = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner
            productName="My Product"
            productVersion="2.3.5"
            licenseEdition="Premium"
            showVersionDetails={false}
        />
    </DivContainer>
);
