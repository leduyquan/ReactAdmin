import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, EmailField, EditButton } from 'react-admin';

const UserFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
)

const UserList = props => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;