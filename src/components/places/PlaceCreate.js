import React from 'react';

import {
  Create,
  TextInput,
  SimpleForm,
  required
} from 'react-admin';
import PlaceTitle from './PlaceTitle';

const PlaceCreate = props => (
  <Create title={<PlaceTitle type="Create" />} {...props}>
    <SimpleForm>
      <TextInput label="Name" source="translations[0].title" validate={required()} />
      <TextInput source="code" validate={required()} />
      <TextInput source="type" validate={required()} />
      <TextInput source="subType" validate={required()} />
      <TextInput source="owner" />
    </SimpleForm>
  </Create>
);

export default PlaceCreate;