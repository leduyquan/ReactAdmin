import React from 'react';

import {
  Create,
  LongTextInput,
  SimpleForm,
} from 'react-admin';

const LanguageCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <LongTextInput source="title" />
    </SimpleForm>
  </Create>
);

export default LanguageCreate;