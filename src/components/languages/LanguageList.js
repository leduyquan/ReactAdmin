import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, EditButton } from 'react-admin';

const LanguageFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
)

const LanguageList = props => (
    <List filters={<LanguageFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default LanguageList;