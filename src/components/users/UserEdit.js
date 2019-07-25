import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput,
  required
} from 'react-admin';
import UserTitle from './UserTitle';

const UserEdit = props => (
  <Edit title={<UserTitle type="Edit" />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="role" />
      <LongTextInput source="userImage" />
      <LongTextInput source="facebook" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;