import React from 'react';

import {
  Create,
  TextInput,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  required
} from 'react-admin';

const ObjectCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Name" source="translations[0].title" validate={required()} />
      <TextInput source="code" validate={required()} />
      <TextInput source="regionCode" validate={required()} />
    </SimpleForm>
  </Create>
);

export default ObjectCreate;