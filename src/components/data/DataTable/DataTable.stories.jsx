import React from 'react';
import _ from 'lodash';
import { Button, Input, Segment } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import DataTable from './DataTable';

const logs = {
    items: [
        {
            id: 68,
            blueprint_id: 'hello-world',
            deployment_id: 'hello-world-openstack'
        },
        {
            id: 62,
            blueprint_id: 'hello-world',
            deployment_id: 'hello-world-azure'
        },
        {
            id: 8,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-gcp'
        },
        {
            id: 55,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-aws'
        },
        {
            id: 14,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-local'
        }
    ],
    metadata: {
        pagination: {
            total: 10,
            offset: 0,
            size: 5
        }
    }
};

export default {
    title: 'Data/DataTable',
    component: DataTable,
    decorators: [LiveEditDecorator({ Button, Input, Segment, DataTable, logs })]
};

export const pagination = () => {
    const [pageSize, setPageSize] = React.useState(5);

    return (
        <DataTable
            fetchData={({ gridParams: { pageSize: ps } }) => setPageSize(ps)}
            totalSize={logs.metadata.pagination.total}
            pageSize={pageSize}
        >
            <DataTable.Column label="ID" />
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            <DataTable.Column label="Deployment" name="deployment_id" />
            {logs.items.map(item => (
                <DataTable.Row key={item.id} onClick={() => {}}>
                    <DataTable.Data>{item.id}</DataTable.Data>
                    <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                    <DataTable.Data>{item.deployment_id}</DataTable.Data>
                </DataTable.Row>
            ))}
        </DataTable>
    );
};

export const selectable = () => {
    const [selected, setSelected] = React.useState(logs.items[0].id);
    return (
        <DataTable totalSize={logs.metadata.pagination.total} pageSize={logs.metadata.pagination.size}>
            <DataTable.Column label="ID" />
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            <DataTable.Column label="Deployment" name="deployment_id" />
            {logs.items.map(item => (
                <DataTable.Row key={item.id} selected={selected === item.id} onClick={() => setSelected(item.id)}>
                    <DataTable.Data>{item.id}</DataTable.Data>
                    <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                    <DataTable.Data>{item.deployment_id}</DataTable.Data>
                </DataTable.Row>
            ))}
        </DataTable>
    );
};

export const searchFilter = () => (
    <DataTable totalSize={logs.metadata.pagination.total} pageSize={logs.metadata.pagination.size} searchable>
        <DataTable.Column label="ID" />
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            <DataTable.Row key={item.id}>
                <DataTable.Data>{item.id}</DataTable.Data>
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
            </DataTable.Row>
        ))}
    </DataTable>
);

export const actionButtons = () => (
    <DataTable>
        <DataTable.Action>
            <Button color="green" content="Deploy" icon="rocket" />
            <Button color="red" content="Remove" icon="remove" />
        </DataTable.Action>

        <DataTable.Column label="ID" />
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            <DataTable.Row key={item.id}>
                <DataTable.Data>{item.id}</DataTable.Data>
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
            </DataTable.Row>
        ))}
    </DataTable>
);

export const filterInputs = () => (
    <DataTable>
        <DataTable.Filter>
            <Input placeholder="Blueprint" />
            <Input placeholder="Deployment" />
        </DataTable.Filter>

        <DataTable.Column label="ID" />
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            <DataTable.Row key={item.id}>
                <DataTable.Data>{item.id}</DataTable.Data>
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
            </DataTable.Row>
        ))}
    </DataTable>
);
export const rowSpanAndStyle = () => {
    const grouped = _(logs.items)
        .groupBy('blueprint_id')
        .map((items, blueprintId) => ({ blueprintId, items }))
        .value();

    return (
        <DataTable>
            <DataTable.Column label="ID" />
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            <DataTable.Column label="Deployment" name="deployment_id" />
            {_.map(grouped, ({ items, blueprintId }) =>
                _.map(items, ({ id, deployment_id: deploymentId }, index) => (
                    <DataTable.Row key={id} onClick={() => {}}>
                        <DataTable.Data style={{ fontWeight: 'bold' }}>{id}</DataTable.Data>
                        {index === 0 && <DataTable.Data rowSpan={items.length}>{blueprintId}</DataTable.Data>}
                        <DataTable.Data>{deploymentId}</DataTable.Data>
                    </DataTable.Row>
                ))
            )}
        </DataTable>
    );
};

export const colSpan = () => (
    <DataTable>
        <DataTable.Column label="ID" />
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.flatMap(item => [
            <DataTable.Row key={item.id}>
                <DataTable.Data>{item.id}</DataTable.Data>
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
            </DataTable.Row>,
            <DataTable.Row key={`${item.id}-additional`}>
                <DataTable.Data colSpan={3}>This row spans all columns</DataTable.Data>
            </DataTable.Row>
        ])}
    </DataTable>
);

export const columnTooltips = () => (
    <DataTable>
        <DataTable.Column label="ID" tooltip="The ID of the deployment" />
        <DataTable.Column
            label="Blueprint"
            name="blueprint_id"
            tooltip={
                <>
                    The name of the <strong>blueprint</strong>
                </>
            }
        />
        <DataTable.Column
            label="Deployment"
            name="deployment_id"
            tooltip={
                <>
                    The name of the <strong>deployment</strong>
                </>
            }
        />
        {logs.items.map(item => (
            <DataTable.Row key={item.id}>
                <DataTable.Data>{item.id}</DataTable.Data>
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
            </DataTable.Row>
        ))}
    </DataTable>
);

export const expandableRow = () => {
    const [selected, setSelected] = React.useState('prestashop');

    return (
        <DataTable>
            <DataTable.Column label="Name" name="id" width="40%" />
            <DataTable.Column label="Date" name="date" width="30%" />
            <DataTable.Column label="Description" width="30%" />

            <DataTable.Row key="drupal" selected={selected === 'drupal'} onClick={() => setSelected('drupal')}>
                <DataTable.Data>Drupal application</DataTable.Data>
                <DataTable.Data>2016-03-04</DataTable.Data>
                <DataTable.Data>description for portal</DataTable.Data>
            </DataTable.Row>

            <DataTable.Row key="wordpress" selected={selected === 'wordpress'} onClick={() => setSelected('wordpress')}>
                <DataTable.Data>Wordpress blog</DataTable.Data>
                <DataTable.Data>2016-01-05</DataTable.Data>
                <DataTable.Data>description for blog</DataTable.Data>
            </DataTable.Row>

            <DataTable.Row key="joomla" selected={selected === 'joomla'} onClick={() => setSelected('joomla')}>
                <DataTable.Data>Joomla website</DataTable.Data>
                <DataTable.Data>2015-08-14</DataTable.Data>
                <DataTable.Data>description for website</DataTable.Data>
            </DataTable.Row>

            <DataTable.RowExpandable expanded={selected === 'prestashop'}>
                <DataTable.Row
                    key="prestashop"
                    selected={selected === 'prestashop'}
                    onClick={() => setSelected('prestashop')}
                >
                    <DataTable.Data>Prestashop store</DataTable.Data>
                    <DataTable.Data>2017-01-05</DataTable.Data>
                    <DataTable.Data>description for e-commerce solution</DataTable.Data>
                </DataTable.Row>
                <DataTable.DataExpandable key="prestashop">
                    <Segment>Additional info when row becomes expanded</Segment>
                </DataTable.DataExpandable>
            </DataTable.RowExpandable>
        </DataTable>
    );
};

export const empty = () => (
    <DataTable totalSize={0}>
        <DataTable.Column label="Name" name="id" width="40%" centerAligned />
        <DataTable.Column label="Date" name="date" width="30%" centerAligned />
        <DataTable.Column label="Description" width="30%" centerAligned />
    </DataTable>
);
