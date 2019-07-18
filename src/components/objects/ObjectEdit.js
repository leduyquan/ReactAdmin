import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  LongTextInput,
  TabbedForm
} from 'react-admin';
import ObjectTitle from './ObjectTitle';

const ObjectEdit = props => (
  <Edit title={<ObjectTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <LongTextInput source="title" />
    </SimpleForm>
  </Edit>
);

export default ObjectEdit;