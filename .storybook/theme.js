import { create } from '@storybook/theming';

import typography from 'cloudify-ui-common/styles/_typography.scss';
import colors from 'cloudify-ui-common/styles/_colors.scss';
import 'semantic-ui-css/semantic.min.css';

export default create({
    base: 'light',

    colorPrimary: colors.greyLight,
    colorSecondary: colors.blueNormal,

    // UI
    appBg: colors.greyVeryLight,
    appBorderColor: colors.greyLight,
    appBorderRadius: 4,

    // Typography
    fontBase: typography.bodyFontFamily,

    // Text colors
    textColor: colors.darkest,
    textInverseColor: colors.white,

    brandTitle: 'Cloudify UI Components'
});
