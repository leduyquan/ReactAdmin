import React from 'react';

import {
  Create,
  LongTextInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
} from 'react-admin';

const PlaceCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <LongTextInput source="title" />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;