import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
    theme: create({
        base: 'light',
        /**
         * NOTE: the font needs to be manually synchronized with the font in cloudify-ui-common
         * since importing SCSS does not work in manager.js
         */
        fontBase: 'Roboto Regular'
    })
});
