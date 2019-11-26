import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import NodesTree from './NodesTree';

export default {
    title: 'Data/NodesTree',
    component: NodesTree,
    decorators: [LiveEditDecorator({ NodesTree })]
};

export const expanded = () => (
    <NodesTree defaultExpandAll>
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            <NodesTree.Node title="Science" key="science" />
            <NodesTree.Node title="Culture" key="culture">
                <NodesTree.Node title="Art" key="art" />
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const collapsed = () => (
    <NodesTree>
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            <NodesTree.Node title="Science" key="science" />
            <NodesTree.Node title="Culture" key="culture">
                <NodesTree.Node title="Art" key="art" />
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const selectable = () => (
    <NodesTree defaultExpandAll selectable>
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            <NodesTree.Node title="Science" key="science" />
            <NodesTree.Node title="Culture" key="culture">
                <NodesTree.Node title="Art" key="art" />
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);
export const withIcons = () => (
    <NodesTree defaultExpandAll showIcon>
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            <NodesTree.Node title="Science" key="science" />
            <NodesTree.Node title="Culture" key="culture">
                <NodesTree.Node title="Art" key="art" />
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const withTreeData = () => (
    <NodesTree
        defaultExpandAll
        treeData={[
            {
                key: 'encyclopaedia',
                title: 'Encyclopaedia',
                children: [
                    { key: 'science', title: 'Science' },
                    {
                        key: 'culture',
                        title: 'Culture',
                        children: [{ key: 'art', title: 'Art' }, { key: 'craft', title: 'Craft' }]
                    }
                ]
            }
        ]}
    />
);
