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
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="userImage" />
      <TextField source="facebook" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;