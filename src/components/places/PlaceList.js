import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const PlaceList = props => (
    <List {...props}>
        <Datagrid>
          <TextField source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            
            <TextField source="title" />
            <EditButton/>
        </Datagrid>
    </List>
);

export default PlaceList;