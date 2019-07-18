import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Create,
  LongTextInput,
  ReferenceInput,
  SelectInput,
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