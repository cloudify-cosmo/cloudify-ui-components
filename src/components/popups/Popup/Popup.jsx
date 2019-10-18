import React from 'react';
import _ from 'lodash';
import { Popup as PopupSemanticUiReact } from 'semantic-ui-react';
import Wrapper from './Wrapper';

/**
 * Popup is a component which wraps [Popup](https://react.semantic-ui.com/modules/popup) used to
 * display additional information popup.
 *
 * See [Popup](https://react.semantic-ui.com/modules/popup) component from Semantic-UI-React for details about props.
 */
export default function Popup(props) {
    const { trigger: triggerFromProps, children: childrenFromProps, ...rest } = props;
    let trigger = triggerFromProps;
    let children = childrenFromProps;

    React.Children.forEach(children, child => {
        if (!!child && child.type === Wrapper) {
            trigger = child.props.children;
            children = _.without(props.children, child);
        }
    });

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <PopupSemanticUiReact {...rest} trigger={trigger}>
            {children}
        </PopupSemanticUiReact>
    );
}
Popup.propTypes = PopupSemanticUiReact.propTypes;
Popup.Header = PopupSemanticUiReact.Header;
Popup.Content = PopupSemanticUiReact.Content;
Popup.Trigger = Wrapper;
