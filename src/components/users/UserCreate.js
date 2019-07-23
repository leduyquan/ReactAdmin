import React from 'react';

import {
  Create,
  SimpleForm,
  TextInput,
  LongTextInput,
  required
} from 'react-admin';

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="role" />
      <LongTextInput source="userImage" />
      <LongTextInput source="facebook" />
    </SimpleForm>
  </Create>
);

export default UserCreate;