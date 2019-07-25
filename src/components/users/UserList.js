import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, EmailField, EditButton } from 'react-admin';
import UserTitle from './UserTitle';

const UserFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
)

const UserList = props => (
  <List title={<UserTitle type="Users" />} filters={<UserFilter />} {...props}>
    <Datagrid>
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