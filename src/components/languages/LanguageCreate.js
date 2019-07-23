import React from 'react';

import {
  Create,
  TextInput,
  LongTextInput,
  SimpleForm,
  required
} from 'react-admin';

const LanguageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="code" validate={required()} />
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

export default LanguageCreate;