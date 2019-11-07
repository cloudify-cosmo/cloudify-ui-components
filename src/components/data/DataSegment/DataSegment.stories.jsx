import React from 'react';

import { Button } from 'semantic-ui-react';
import DataSegment from './DataSegment';

export default {
    title: 'Data/DataSegment',
    component: DataSegment
};
export const simple = () => (
    <DataSegment>
        {[1, 2, 3, 4].map(item => (
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
            </DataSegment.Item>
        ))}
    </DataSegment>
);

// FIXME: When https://github.com/storybookjs/storybook/issues/8177 is solved, remove this wrapper and render component with hooks directly in the story export
const Selectable = () => {
    const [selected, setSelected] = React.useState(1);
    return (
        <DataSegment>
            {[1, 2, 3, 4].map(item => (
                <DataSegment.Item
                    key={item}
                    selected={item === selected}
                    onClick={() => setSelected(item)}
                >
                    <h2>Item {item}</h2>
                </DataSegment.Item>
            ))}
        </DataSegment>
    );
};
export const selectable = () => <Selectable />;

export const pagination = () => (
    <DataSegment pageSize={4} totalSize={10}>
        {[1, 2, 3, 4].map(item => (
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const searchFilter = () => (
    <DataSegment searchable>
        {[1, 2, 3, 4].map(item => (
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const actionButtons = () => (
    <DataSegment>
        <DataSegment.Action>
            <Button color="green" content="Deploy" icon="rocket" />
            <Button color="orange" content="Add" icon="add" />
        </DataSegment.Action>
        {[1, 2, 3, 4].map(item => (
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const empty = () => (
    <DataSegment totalSize={0}>
        <DataSegment.Item>
            <h2>Item</h2>
        </DataSegment.Item>
    </DataSegment>
);
