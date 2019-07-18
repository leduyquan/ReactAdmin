import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const PlaceFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
)

const PlaceList = props => (
    <List filters={<PlaceFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>

            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default PlaceList;