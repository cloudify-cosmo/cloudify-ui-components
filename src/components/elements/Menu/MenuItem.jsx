import React from 'react';
import { Menu as SemanticUiReactMenu } from 'semantic-ui-react';

export default class MenuItem extends SemanticUiReactMenu.Item {
    render() {
        const { name } = this.props;
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <SemanticUiReactMenu.Item {...this.props} option-value={name} />;
    }
}
