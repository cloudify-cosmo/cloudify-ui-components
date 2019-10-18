import React from 'react';
import _ from 'lodash';
import { Dropdown as SemanticUiReactDropdown } from 'semantic-ui-react';

/**
 * Dropdown is a component which extends [Dropdown](https://react.semantic-ui.com/modules/dropdown) component from Semantic-UI-React framework.
 * It has `clearable` prop set by default and adds 'option-value' field containing string value of and option to options list.
 *
 * See [Dropdown](https://react.semantic-ui.com/modules/dropdown) component from Semantic-UI-React framework for details about props and usage details.
 */
export default class Dropdown extends SemanticUiReactDropdown {
    render() {
        const addOptionValueAttribute = options => {
            return _.map(options, option => ({ ...option, 'option-value': String(option.value) || 'empty-option' }));
        };
        const props = { ...this.props };
        if (props.options) {
            props.options = addOptionValueAttribute(props.options);
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <SemanticUiReactDropdown clearable {...props} />;
    }
}
