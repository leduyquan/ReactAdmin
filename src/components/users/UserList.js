import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, EmailField, EditButton, FunctionField } from 'react-admin';
import UserTitle from './UserTitle';
import { AppConstant } from "../../providers/constants";

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
      <FunctionField
        label="Image"
        render={record => {
          if (record.userImage === null || record.userImage === "") {
            return null;
          }
          return (
            <img
              alt={record.defaultImage}
              src={`${AppConstant.SERVER_IMAGE}${record.userImage}`}
              width={80}
              height={80}
            />
          );
        }}
      />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="facebook" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;