import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, EditButton } from 'react-admin';

const ObjectFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
)

const ObjectList = props => (
    <List filters={<ObjectFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default ObjectList;