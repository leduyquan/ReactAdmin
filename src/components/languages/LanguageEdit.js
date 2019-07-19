import React from 'react';
import {
  SimpleForm,
  DisabledInput,
  Edit,
  LongTextInput
} from 'react-admin';
import LanguageTitle from './LanguageTitle';

const LanguageEdit = props => (
  <Edit title={<LanguageTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <LongTextInput source="title" />
    </SimpleForm>
  </Edit>
);

export default LanguageEdit;