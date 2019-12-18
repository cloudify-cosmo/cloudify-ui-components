import React from 'react';

// FIXME: When https://github.com/storybookjs/storybook/issues/8177# is fixed we should get rid of this workaround
//        described in the comment: https://github.com/storybookjs/storybook/issues/8177#issuecomment-555290252
export default function StoryWithHooks(StoryFn) {
    // eslint-disable-next-line react/display-name
    return () => <StoryFn />;
}
