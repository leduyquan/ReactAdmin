import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const LanguageList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default LanguageList;