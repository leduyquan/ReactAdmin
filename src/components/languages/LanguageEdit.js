import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  TextInput,
  required
} from 'react-admin';
import LanguageTitle from './LanguageTitle';

const LanguageEdit = props => (
  <Edit title={<LanguageTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="code" validate={required()} />
      <TextInput source="title" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default LanguageEdit;