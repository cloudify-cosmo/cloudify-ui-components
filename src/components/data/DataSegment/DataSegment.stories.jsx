import React from 'react';

import { Button } from 'semantic-ui-react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import StoryWithHooks from 'decorators/StoryWithHooks';
import DataSegment from './DataSegment';

export default {
    title: 'Data/DataSegment',
    component: DataSegment,
    decorators: [LiveEditDecorator({ Button, DataSegment })]
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

export const selectable = StoryWithHooks(() => {
    const [selected, setSelected] = React.useState(1);
    return (
        <DataSegment>
            {[1, 2, 3, 4].map(item => (
                <DataSegment.Item key={item} selected={item === selected} onClick={() => setSelected(item)}>
                    <h2>Item {item}</h2>
                </DataSegment.Item>
            ))}
        </DataSegment>
    );
});

export const pagination = StoryWithHooks(() => {
    const [pageSize, setPageSize] = React.useState(3);

    return (
        <DataSegment
            fetchData={({ gridParams: { pageSize: ps } }) => setPageSize(ps)}
            totalSize={10}
            pageSize={pageSize}
        >
            {[1, 2, 3, 4].map(item => (
                <DataSegment.Item key={item}>
                    <h2>Item {item}</h2>
                </DataSegment.Item>
            ))}
        </DataSegment>
    );
});

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
