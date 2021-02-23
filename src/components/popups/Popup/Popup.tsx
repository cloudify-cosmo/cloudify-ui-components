import React, { FunctionComponent, isValidElement, ReactNodeArray } from 'react';
import _ from 'lodash';
import { Popup as PopupSemanticUiReact, PopupProps as SemanticUiPopupProps } from 'semantic-ui-react';
import Wrapper from './Wrapper';

export type PopupProps = SemanticUiPopupProps;
interface AdditionalPopupProperties {
    Header: typeof PopupSemanticUiReact.Header;
    Content: typeof PopupSemanticUiReact.Content;
    Trigger: typeof Wrapper;
}

/**
 * Popup is a component which wraps [Popup](https://react.semantic-ui.com/modules/popup) used to
 * display additional information popup.
 *
 * See [Popup](https://react.semantic-ui.com/modules/popup) component from Semantic-UI-React for details about props.
 */
const Popup: FunctionComponent<PopupProps> & AdditionalPopupProperties = props => {
    const { trigger: triggerFromProps, children: childrenFromProps, ...rest } = props;
    let trigger = triggerFromProps;
    let children = childrenFromProps;

    React.Children.forEach(children, child => {
        if (isValidElement(child) && child.type === Wrapper) {
            trigger = child.props.children;
            children = _.without(props.children as ReactNodeArray, child);
        }
    });

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <PopupSemanticUiReact {...rest} trigger={trigger}>
            {children}
        </PopupSemanticUiReact>
    );
};
export default Popup;

Popup.propTypes = PopupSemanticUiReact.propTypes;
Popup.Header = PopupSemanticUiReact.Header;
Popup.Content = PopupSemanticUiReact.Content;
Popup.Trigger = Wrapper;
