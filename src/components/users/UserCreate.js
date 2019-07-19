import React from 'react';

import {
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin';

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput label="address" source="address.street" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);

export default UserCreate;