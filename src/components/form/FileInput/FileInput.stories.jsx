import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import _ from 'lodash';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';
import StoryWithHooks from '../../../decorators/StoryWithHooks';

export default {
    title: 'Form.File',
    component: Form.File,
    decorators: [LiveEditDecorator({ useState, Button })]
};

export const basic = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file1" />
        </Form.Field>
    </Form>
);

export const noReset = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file2" showReset={false} />
        </Form.Field>
    </Form>
);

export const button = () => (
    <Form.File
        name="file3"
        showInput={false}
        showReset={false}
        openButtonParams={{ className: 'rightFloated', content: 'Load File', labelPosition: 'left' }}
    />
);

export const controlled = StoryWithHooks(() => {
    const [value, setValue] = useState();

    return (
        <>
            <Form.File
                name="file3"
                value={value ? `Selected file: ${value}` : ''}
                onChange={(file, fileName) => setValue(fileName)}
            />{' '}
            <Button onClick={_.ary(setValue, 0)}>Reset</Button>
        </>
    );
});
