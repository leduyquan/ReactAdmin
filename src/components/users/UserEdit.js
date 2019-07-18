import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput,
  TabbedForm
} from 'react-admin';
import UserTitle from './UserTitle';

const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <LongTextInput source="address.street" />
      <LongTextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;