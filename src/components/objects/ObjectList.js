import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const ObjectList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default ObjectList;