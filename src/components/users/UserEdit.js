import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput
} from 'react-admin';
import UserTitle from './UserTitle';

const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="role" />
      <LongTextInput source="userImage" />
      <LongTextInput source="facebook" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;