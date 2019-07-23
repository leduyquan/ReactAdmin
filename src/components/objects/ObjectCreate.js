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
      <TextInput source="code" validate={required()} />
      <TextInput source="regionCode" validate={required()} />
      <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="url"/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default ObjectCreate;