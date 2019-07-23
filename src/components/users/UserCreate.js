import React from 'react';

import {
  Create,
  SimpleForm,
  TextInput,
  LongTextInput
} from 'react-admin';

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="role" />
      <LongTextInput source="userImage" />
      <LongTextInput source="facebook" />
    </SimpleForm>
  </Create>
);

export default UserCreate;