import React from 'react';

import {
  Create,
  LongTextInput,
  SimpleForm,
} from 'react-admin';

const ObjectCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <LongTextInput source="title" />
    </SimpleForm>
  </Create>
);

export default ObjectCreate;