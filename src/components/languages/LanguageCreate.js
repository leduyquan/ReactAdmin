import React from 'react';

import {
  Create,
  TextInput,
  SimpleForm,
  required
} from 'react-admin';

const LanguageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="code" validate={required()} />
      <TextInput source="title" validate={required()} />
    </SimpleForm>
  </Create>
);

export default LanguageCreate;